---
task: 04-header-footer-navigation
plan: 00-project-foundations
status: done
---

# Task: Header, footer, and navigation

## What's in place

- `src/config/navigation.ts` — the single source of truth for the custom i18n routing. Each `navigationPages[]` entry carries fully independent, translated paths per language (e.g. `nl: "/diensten"`, `en: "/en/services"` — not a shared `[lang]/[slug]` shape), plus helper functions: `getNavigationItems`, `getLanguageSwitcherItems`, `getLanguageForPath`, `getRoutePath`, `getPageForPath`. This is deliberately *not* Astro's built-in `i18n` router, which assumes matching slugs across locales — see [Plan 02](../02-routing-architecture/index.md)'s background section for why.
- `src/components/Header.astro` — logo (light/dark variants), `DesktopNavigation`/`MobileNavigation`, theme toggle, sticky+blurred header.
- `src/components/navigation/DesktopNavigation.astro` / `MobileNavigation.astro` — nav links with active-state styling (`aria-current="page"`), language switcher, mobile full-screen overlay menu with focus management (open/close focus handling, Escape to close, click-outside-link-closes).
- `src/components/Footer.astro` — currently a minimal placeholder (copyright line + "Dummy footer" text) — not yet built out with the real footer nav (Diensten/Werkwijze/Projecten/Over EMVEE/Kennis/Contact/Privacy/Terms) that `EmVee-Docs/docs/website/NAVIGATION.md` specifies.
- `src/components/Icon.astro` — small fixed union of inline SVG icons (`arrow-right-linear`, `hamburger-menu-linear`, `close-circle-linear`, `moon-linear`, `sun-2-linear`), no icon library dependency.

## Known gap

The footer is a placeholder, not the real one. Building it out (nav links, legal links, taxonomy match to `NAVIGATION.md`) isn't currently tracked in any plan — worth adding as a task once the main page rollout ([Plan 04](../04-page-rollout-nl-en/index.md)) is unblocked, since the footer should link to pages that need to actually exist first.

## Related files

- `src/config/navigation.ts`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/navigation/DesktopNavigation.astro`
- `src/components/navigation/MobileNavigation.astro`
- `src/components/Icon.astro`
