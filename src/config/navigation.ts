export const languages = ["nl", "en"] as const;

export type Language = (typeof languages)[number];
export type NavigationPageId =
	| "home"
	| "services"
	| "process"
	| "projects"
	| "about"
	| "knowledge"
	| "contact";

export type NavigationPage = {
	id: NavigationPageId;
	label: Record<Language, string>;
	path: Record<Language, string>;
};

export type NavigationItem = {
	id: NavigationPageId;
	label: string;
	href: string;
	isActive: boolean;
};

export type LanguageSwitcherItem = {
	label: string;
	lang: Language;
	href: string;
	available: boolean;
	isActive: boolean;
};

export type LegalPageId = "privacy" | "terms";

export type LegalPage = {
	id: LegalPageId;
	label: Record<Language, string>;
	path: Record<Language, string>;
};

export const legalPages: LegalPage[] = [
	{
		id: "privacy",
		label: { nl: "Privacy", en: "Privacy" },
		path: { nl: "/privacy", en: "/en/privacy" },
	},
	{
		id: "terms",
		label: { nl: "Voorwaarden", en: "Terms" },
		path: { nl: "/voorwaarden", en: "/en/terms" },
	},
];

export const defaultLanguage: Language = "nl";

export const navigationPages: NavigationPage[] = [
	{
		id: "home",
		label: { nl: "Home", en: "Home" },
		path: { nl: "/", en: "/en" },
	},
	{
		id: "services",
		label: { nl: "Diensten", en: "Services" },
		path: { nl: "/diensten", en: "/en/services" },
	},
	{
		id: "process",
		label: { nl: "Werkwijze", en: "Process" },
		path: { nl: "/werkwijze", en: "/en/process" },
	},
	{
		id: "projects",
		label: { nl: "Projecten", en: "Projects" },
		path: { nl: "/projecten", en: "/en/projects" },
	},
	{
		id: "about",
		label: { nl: "Over EMVEE", en: "About EMVEE" },
		path: { nl: "/over-emvee", en: "/en/about-emvee" },
	},
	{
		id: "knowledge",
		label: { nl: "Kennis", en: "Knowledge" },
		path: { nl: "/kennis", en: "/en/knowledge" },
	},
	{
		id: "contact",
		label: { nl: "Contact", en: "Contact" },
		path: { nl: "/contact", en: "/en/contact" },
	},
];

export function normalizePath(path: string): string {
	const pathname = path.split(/[?#]/)[0] || "/";

	if (pathname === "/") return pathname;

	return pathname.replace(/\/$/, "");
}

export function getPageForPath(path: string): NavigationPage | undefined {
	const currentPath = normalizePath(path);

	return navigationPages.find((page) =>
		languages.some((language) => normalizePath(page.path[language]) === currentPath),
	);
}

export function getLanguageForPath(path: string): Language {
	const currentPath = normalizePath(path);
	const matchingPage = getPageForPath(currentPath);

	if (matchingPage) {
		const matchingLanguage = languages.find(
			(language) => normalizePath(matchingPage.path[language]) === currentPath,
		);

		if (matchingLanguage) return matchingLanguage;
	}

	return currentPath === "/en" || currentPath.startsWith("/en/")
		? "en"
		: defaultLanguage;
}

export function getRoutePath(id: NavigationPageId, language: Language): string {
	return navigationPages.find((page) => page.id === id)?.path[language] ?? "/";
}

export function getNavigationItems(language: Language, currentPath: string): NavigationItem[] {
	const normalizedCurrentPath = normalizePath(currentPath);

	return navigationPages.map((page) => {
		const href = page.path[language];
		const normalizedHref = normalizePath(href);

		return {
			id: page.id,
			label: page.label[language],
			href,
			isActive:
				page.id === "home"
					? normalizedCurrentPath === normalizedHref
					: normalizedCurrentPath === normalizedHref ||
						normalizedCurrentPath.startsWith(`${normalizedHref}/`),
		};
	});
}

export function getLanguageSwitcherItems(currentPath: string, activeLanguage: Language): LanguageSwitcherItem[] {
	const matchingPage = getPageForPath(currentPath);
	const normalizedCurrentPath = normalizePath(currentPath);

	return languages.map((language) => {
		let href = matchingPage?.path[language];

		if (!href) {
			href = language === "en"
				? `/en${normalizedCurrentPath === "/" ? "" : normalizedCurrentPath}`
				: normalizedCurrentPath.replace(/^\/en(?=\/|$)/, "") || "/";
		}

		return {
			label: language.toUpperCase(),
			lang: language,
			href,
			available: true,
			isActive: language === activeLanguage,
		};
	});
}
