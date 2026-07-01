---
task: 05-build-contact-form-component
plan: 03-component-library
status: built, blocked on custom domain for email sending
---

# Task: Build Contact form component

## Goal

Create `src/components/ContactForm.astro` for the contact page. Since the
site is static (no server runtime by default), form submission needs a
plan: either a Cloudflare Worker/Pages Function endpoint, or a third-party
form backend (e.g. a static-friendly form service).

## Decision

Same-origin Worker endpoint using **Cloudflare Email Service** (the
`send_email` binding), not a third-party form service — keeps submissions
same-origin and avoids routing visitor data through another company for a
low-volume contact form.

## What's built

- `src/components/ContactForm.astro` — form fields match the original spec
  (`EmVee-Docs/docs/website/content/contact.md`): name, organisation
  (optional), email, phone (optional), subject, message, consent checkbox
  linking to the privacy policy. All copy comes from a new `contactForm`
  content type (`src/content.config.ts`) — nothing hardcoded, consistent
  with every other component. A hidden honeypot field (`website`) silently
  drops bot submissions.
- Native HTML validation (`required`, `type="email"`) is the baseline —
  works with JavaScript disabled.
- Progressive enhancement: JS intercepts submit, POSTs JSON to
  `/api/contact`, shows an inline `aria-live` success/error message.
  Without JS, the form's plain `action="/api/contact" method="post"`
  still submits (as `application/x-www-form-urlencoded`) and the Worker
  returns a minimal branded HTML confirmation/error page instead of JSON.
- `worker/index.ts` — the Worker endpoint. Validates required fields,
  drops honeypot-triggered submissions, and calls `env.EMAIL.send()` to
  forward the message with `replyTo` set to the submitter's address (so
  replying just works). Handles both JSON (fetch) and form-urlencoded
  (no-JS) request bodies.
- `wrangler.jsonc`: added `main` (the Worker now coexists with static
  assets, per [Plan 06](../../06-deployment-cloudflare/index.md)'s
  anticipated path — `run_worker_first: ["/api/*"]` routes only `/api/*`
  to the Worker, everything else still served directly as a static asset),
  `send_email` binding, `nodejs_compat` flag.

## Blocker: email sending needs a custom domain

Cloudflare Email Service requires the `from` address's domain to be
onboarded via `wrangler email sending enable <domain>`, which adds SPF/DKIM
DNS records — **not possible on a `*.workers.dev` deployment**, since
Cloudflare doesn't expose DNS control over that shared domain. Until a real
custom domain is added to the Cloudflare account:

- `CONTACT_DESTINATION_EMAIL` and `CONTACT_FROM_EMAIL` are unset
- the Worker deliberately returns `503 not_configured` (JSON) or a plain
  "form isn't fully configured yet, email us directly" page (no-JS) rather
  than silently failing or pretending to succeed
- once a domain exists: `wrangler email sending enable yourdomain.com`,
  then set both as `vars` in `wrangler.jsonc` (not secrets — they're
  addresses, not credentials) and redeploy

Tested locally with `wrangler dev`: static assets still serve correctly,
valid submissions correctly hit the "not configured" path, the honeypot
silently accepts and drops bot-shaped submissions, missing required fields
return 400, and the non-JS form-urlencoded fallback returns a proper HTML
page instead of raw JSON.

## Acceptance criteria

- Form is usable and validates without JavaScript (native HTML validation
  attributes as the baseline) — done
- Submission path decision is documented in this file once made — done

## Related files

- `src/components/ContactForm.astro`
- `src/content.config.ts` (`contactForm` schema)
- `src/content/components/{nl,en}/contact/form.md`
- `worker/index.ts`
- `wrangler.jsonc`
- [Plan 06: Deployment](../../06-deployment-cloudflare/index.md)
