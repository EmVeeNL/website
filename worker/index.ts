/// <reference types="@cloudflare/workers-types" />

export interface Env {
	EMAIL: SendEmail;
	/** Destination inbox for contact form submissions. Set via `wrangler secret put` or a `vars` entry once known. */
	CONTACT_DESTINATION_EMAIL?: string;
	/**
	 * Sender address. Must be on a domain onboarded via `wrangler email sending enable <domain>` —
	 * not possible on a *.workers.dev deployment, only once a custom domain is added.
	 */
	CONTACT_FROM_EMAIL?: string;
}

type ContactPayload = {
	name: string;
	organisation: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
	consent: boolean;
	website: string;
	lang: "nl" | "en";
};

const COPY = {
	nl: {
		title: "Bericht verzonden",
		success: "Bedankt voor je bericht. EMVEE neemt zo snel mogelijk contact met je op.",
		errorTitle: "Er ging iets mis",
		invalid: "Vul alle verplichte velden correct in en probeer het opnieuw.",
		notConfigured: "Het contactformulier is nog niet volledig ingesteld. Neem rechtstreeks contact op via e-mail.",
		failed: "Het bericht kon niet worden verzonden. Probeer het later opnieuw.",
		back: "Terug naar de contactpagina",
	},
	en: {
		title: "Message sent",
		success: "Thank you for your message. EMVEE will get back to you as soon as possible.",
		errorTitle: "Something went wrong",
		invalid: "Please fill in all required fields correctly and try again.",
		notConfigured: "The contact form isn't fully configured yet. Please contact us directly by email.",
		failed: "The message could not be sent. Please try again later.",
		back: "Back to the contact page",
	},
} as const;

function wantsJson(request: Request): boolean {
	return (request.headers.get("accept") ?? "").includes("application/json");
}

function htmlPage(lang: "nl" | "en", heading: string, message: string, backHref: string): Response {
	const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${heading}</title>
</head>
<body style="font-family: system-ui, sans-serif; max-width: 32rem; margin: 4rem auto; padding: 0 1.5rem; color: #111b34;">
<h1>${heading}</h1>
<p>${message}</p>
<p><a href="${backHref}">${COPY[lang].back}</a></p>
</body>
</html>`;

	return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}

function jsonResponse(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

async function parsePayload(request: Request): Promise<Partial<ContactPayload>> {
	const contentType = request.headers.get("content-type") ?? "";

	if (contentType.includes("application/json")) {
		return (await request.json()) as Partial<ContactPayload>;
	}

	const formData = await request.formData();
	const value = (key: string) => {
		const raw = formData.get(key);
		return typeof raw === "string" ? raw : "";
	};

	return {
		name: value("name"),
		organisation: value("organisation"),
		email: value("email"),
		phone: value("phone"),
		subject: value("subject"),
		message: value("message"),
		consent: formData.get("consent") === "on",
		website: value("website"),
		lang: value("lang") === "en" ? "en" : "nl",
	};
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname !== "/api/contact" || request.method !== "POST") {
			return new Response("Not found", { status: 404 });
		}

		const referer = request.headers.get("referer");
		const lang: "nl" | "en" = referer?.includes("/en/") ? "en" : "nl";
		const backHref = lang === "en" ? "/en/contact" : "/contact";
		const asJson = wantsJson(request);

		let raw: Partial<ContactPayload>;

		try {
			raw = await parsePayload(request);
		} catch {
			return asJson
				? jsonResponse({ ok: false, error: "invalid_body" }, 400)
				: htmlPage(lang, COPY[lang].errorTitle, COPY[lang].invalid, backHref);
		}

		// Honeypot: a hidden field real visitors never fill in. Silently accept and drop.
		if (typeof raw.website === "string" && raw.website.trim() !== "") {
			return asJson ? jsonResponse({ ok: true }) : htmlPage(lang, COPY[lang].title, COPY[lang].success, backHref);
		}

		const name = raw.name?.trim() ?? "";
		const email = raw.email?.trim() ?? "";
		const subject = raw.subject?.trim() ?? "";
		const message = raw.message?.trim() ?? "";
		const organisation = raw.organisation?.trim() ?? "";
		const phone = raw.phone?.trim() ?? "";
		const consent = raw.consent === true;

		const isValid = name && email.includes("@") && subject && message && consent;

		if (!isValid) {
			return asJson
				? jsonResponse({ ok: false, error: "invalid_fields" }, 400)
				: htmlPage(lang, COPY[lang].errorTitle, COPY[lang].invalid, backHref);
		}

		if (!env.CONTACT_DESTINATION_EMAIL || !env.CONTACT_FROM_EMAIL) {
			return asJson
				? jsonResponse({ ok: false, error: "not_configured" }, 503)
				: htmlPage(lang, COPY[lang].errorTitle, COPY[lang].notConfigured, backHref);
		}

		const bodyLines = [
			`Naam: ${name}`,
			organisation && `Organisatie: ${organisation}`,
			`E-mail: ${email}`,
			phone && `Telefoon: ${phone}`,
			`Onderwerp: ${subject}`,
			"",
			message,
		].filter((line): line is string => Boolean(line));

		try {
			await env.EMAIL.send({
				to: env.CONTACT_DESTINATION_EMAIL,
				from: { email: env.CONTACT_FROM_EMAIL, name: "EMVEE website" },
				replyTo: email,
				subject: `[Contact] ${subject}`,
				text: bodyLines.join("\n"),
			});
		} catch {
			return asJson
				? jsonResponse({ ok: false, error: "send_failed" }, 502)
				: htmlPage(lang, COPY[lang].errorTitle, COPY[lang].failed, backHref);
		}

		return asJson ? jsonResponse({ ok: true }) : htmlPage(lang, COPY[lang].title, COPY[lang].success, backHref);
	},
} satisfies ExportedHandler<Env>;
