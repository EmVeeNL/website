---
task: 03-base-layout-and-theme-toggle
plan: 00-project-foundations
status: done
---

# Task: Base layout and theme toggle

## What's in place

- `src/layouts/BaseLayout.astro` — the shared `<html>`/`<head>`/`<body>` shell every page renders through, taking `title`/`description`/`lang`/`bodyClass`/`mainClass` props. Renders `Header`, `MainContent` (a thin `<main>` wrapper), and `Footer` around the page's `<slot />`.
- An inline, blocking `<script>` in `<head>` reads `localStorage["emvee-theme"]` (falling back to `prefers-color-scheme`) and sets `document.documentElement.dataset.theme` before first paint — prevents a flash of the wrong theme.
- A skip-link (`.skip-link` in `global.css`) jumps to `#main-content`.
- Theme switching itself lives in `Header.astro`'s inline `<script>`: toggles `data-theme`, persists to `localStorage`, and — when `document.startViewTransition` is available and `prefers-reduced-motion` isn't set — runs a full-viewport mask animation (`global.css`'s `@supports (view-transition-name: none)` block, using the SVG "splash" masks in `src/assets/masks/`) instead of an instant swap.

## Why this shape

The inline pre-paint script is the standard fix for theme-flash and matches the pattern documented in `EmVee-Docs/docs/website/design-system/DARK_MODE.md`. The view-transition splash is a bespoke enhancement beyond what that doc specifies — a deliberate bit of brand personality, gated correctly behind both browser support and reduced-motion.

## Related files

- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro` (theme toggle script)
- `src/components/MainContent.astro`
- `src/styles/global.css` (`.skip-link`, view-transition block)
- `src/assets/masks/splash-{1,2,3}.svg`
