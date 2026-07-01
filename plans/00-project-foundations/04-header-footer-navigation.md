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
- `src/components/Footer.astro` — the real footer, matching `EmVee-Docs/docs/website/NAVIGATION.md`'s spec: logo, tagline, main nav (Diensten/Werkwijze/Projecten/Over EMVEE/Kennis/Contact via the same `getNavigationItems` Header uses, `home` filtered out), legal links (Privacy/Voorwaarden — new `legalPages` export in `navigation.ts`), copyright. Fully language-aware, no separate language switcher (Header already has one).
- `src/components/Icon.astro` — small fixed union of inline SVG icons (`arrow-right-linear`, `hamburger-menu-linear`, `close-circle-linear`, `moon-linear`, `sun-2-linear`), no icon library dependency.

## Resolved: real footer + legal pages

Building the footer required the Privacy/Terms pages to actually exist (footer shouldn't link to 404s). Rather than inventing a new content type for long-form legal prose, `PageRenderer.astro` now has a fallback: when a `pages` entry has an empty `components: []`, it renders that entry's own markdown body directly (via `astro:content`'s `render()`) instead of composing from section components — long-form prose like a privacy policy doesn't decompose into `intro`/`textBlock`/`cardGrid` without pointless restructuring. Populated `nl/privacy.md`, `nl/voorwaarden.md`, `en/privacy.md`, `en/terms.md` from `EmVee-Docs/docs/website/content/legal/` (verbatim — draft legal text with `[INVULLEN]`/`[TO BE COMPLETED]` placeholders for real company details, not ready to actually publish as-is). Extracted a shared `.prose-content` CSS class (`global.css`) used by this fallback and by `ProjectDetail.astro`/`ArticleDetail.astro`, replacing what had been duplicated scoped `<style>` blocks in each.

Verified with a real browser (temporary Playwright + a locally-cached Chromium, same approach as Plan 05): footer renders correctly in both light/dark and nl/en, legal pages render their markdown body correctly including tables and code blocks, zero console errors. Caught and fixed one real bug this way — the legal page's `<h1>` had no font-size utility applied (only global weight/line-height), so it rendered far too small; added explicit `h1` sizing to `.prose-content`.

## Related files

- `src/config/navigation.ts`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/navigation/DesktopNavigation.astro`
- `src/components/navigation/MobileNavigation.astro`
- `src/components/Icon.astro`
- `src/components/PageRenderer.astro`
- `src/styles/global.css` (`.prose-content`)
- `src/content/pages/{nl,en}/privacy.md`, `nl/voorwaarden.md`, `en/terms.md`
