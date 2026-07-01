---
task: 01-astro-tailwind-v4-setup
plan: 00-project-foundations
status: done
---

# Task: Astro + Tailwind v4 setup

## What's in place

- Astro 7 project (`package.json`: `astro@^7.0.3`), pnpm-managed, static output (`build.output: "static"` is the default — no adapter configured).
- Tailwind v4 via the official Vite plugin, not the legacy `@astrojs/tailwind` integration: `@tailwindcss/vite` registered in `astro.config.mjs`'s `vite.plugins`, and `@import "tailwindcss";` at the top of `src/styles/global.css` — CSS-first config, no `tailwind.config.mjs` file.
- `dev`/`build`/`preview`/`astro` scripts in `package.json`. `astro dev --background` is the documented way to run the dev server (see `AGENTS.md`).

## Why this shape

Confirmed against current Astro docs during the initial scan of this project: the Vite-plugin approach is the current recommendation for Tailwind v4 in Astro (`npx astro add tailwind` on Astro ≥5.2 wires up the same thing automatically). No changes needed here going forward unless Tailwind's integration guidance changes.

## Related files

- `astro.config.mjs`
- `src/styles/global.css`
- `package.json`
