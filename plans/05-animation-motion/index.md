---
plan: 05-animation-motion
status: planned
---

# Plan 05: Animation (Motion)

## Objective

Add the `motion` package (framework-agnostic successor to Framer Motion,
same team/API) for interactive animation, layered on top of the already-built
static components — not blocking any prior plan.

## Background

Decision made: use `motion` (the vanilla-JS/`motion.dev` package), not
`framer-motion`, because Framer Motion is React-only and pulling in
`@astrojs/react` + a React runtime purely for animation would work against
Astro's zero-JS-by-default static rendering. `motion` works directly inside
Astro `<script>` blocks / islands with `client:*` directives without a
framework runtime.

The project already has one hand-rolled animation system worth being
consistent with: the theme-toggle view-transition "splash" effect in
`src/components/Header.astro` (`document.startViewTransition`) and
`src/styles/global.css` (`@supports (view-transition-name: none)` block).
It also already respects `prefers-reduced-motion` in two places
(`Header.astro`'s `setTheme`, `global.css`'s `.cta-gradient` media query) —
every new animation must do the same.

## Tasks

1. [Install and configure Motion](01-install-and-configure-motion.md)
2. [Animate navigation and theme toggle](02-animate-navigation-and-theme-toggle.md)
3. [Animate hero and section reveals](03-animate-hero-and-section-reveals.md)

## Out of scope

- Replacing the existing View Transitions API theme-splash effect — that
  stays as-is, it's not something Motion needs to own.
