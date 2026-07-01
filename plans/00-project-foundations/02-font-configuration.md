---
task: 02-font-configuration
plan: 00-project-foundations
status: done
---

# Task: Font configuration

## What's in place

Astro's native `fonts` config (`astro.config.mjs`, `astro/config`'s `fontProviders`) — not a manual `@font-face` block, not the `@fontsource` package installed directly:

- **Chocopie** — `fontProviders.local()`, weights 100/300/400/700/900, files at `src/assets/fonts/Chocopie {Thin,Light,Regular,Bold,Black}.woff2`, `cssVariable: "--font-chocopie"`.
- **Geist** — `fontProviders.fontsource()`, weights 400/600/700, `cssVariable: "--font-geist"`.
- **Geist Mono** — `fontProviders.fontsource()`, weights 400/500/600/700, `cssVariable: "--font-geist-mono"`.

`src/layouts/BaseLayout.astro` preloads specific weight/style combinations per font via the `<Font>` component from `astro:assets` (Chocopie 400/700/900, Geist 400, Geist Mono not preloaded) rather than preloading everything.

`src/styles/global.css` maps these into semantic tokens: `--font-heading` (Chocopie stack), `--font-content` (Geist stack), `--font-code` (Geist Mono stack), then into Tailwind's `font-sans`/`font-serif`/`font-mono` via `@theme inline`.

## Why this shape

Matches current Astro docs guidance (confirmed during the initial scan): the built-in `fonts` API is the current recommended approach over manual `@font-face` or the raw `@fontsource` package, since it handles subsetting, fallback generation, and preload wiring automatically. `EmVee-Docs/docs/website/design-system/TYPOGRAPHY.md` documents the same font choices in more depth (weight usage rules, why Chocopie has no 500/600, etc.) — that document is about *usage rules*, this task is about the *technical wiring*.

## Related files

- `astro.config.mjs`
- `src/layouts/BaseLayout.astro`
- `src/assets/fonts/`
