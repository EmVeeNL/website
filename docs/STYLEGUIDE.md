# EMVEE Styleguide

This documents the design tokens actually implemented in `src/styles/global.css` and `astro.config.mjs`. It's a condensed, code-accurate version of the fuller design-system docs in `EmVee-Docs/docs/website/design-system/` — read those for the full rationale; this file is the quick reference for building components.

## Color model: OKLCH

Every color in `src/styles/global.css` is defined as `oklch(L C H)` — perceptually uniform lightness/chroma/hue — not hex or `rgb()`. This is deliberate:

- **Predictable lightness steps.** `foreground` → `foreground-muted` → `foreground-subtle` are lightness steps on the *same* hue, so building a new muted variant means adjusting one number, not eyeballing a new hex.
- **Hue-stable dark mode.** The light/dark pairs share hue and chroma and only shift lightness, so dark mode doesn't drift toward a different-feeling blue.
- **`color-mix(in oklch, ...)`** is used directly in `Hero.astro` and `global.css` (e.g. the hero gradient overlay, `.cta-secondary-gradient`) to blend tokens without ever touching a hex value.

Never add a hex or `rgb()` color to a component. If a token doesn't exist yet, add it to `global.css` as `oklch(...)`, not as a literal color, so it stays consistent with the rest of the palette.

## Semantic tokens (current)

Defined in `:root` (light) and `[data-theme="dark"]` in `src/styles/global.css`, exposed to Tailwind via `@theme inline`:

| Token | Role |
|---|---|
| `--color-background` | Page background |
| `--color-background-subtle` | Slightly recessed background (alternating sections) |
| `--color-surface-muted` | Card / grouped-content background |
| `--color-foreground` | Primary text |
| `--color-foreground-muted` | Secondary text |
| `--color-foreground-subtle` | Tertiary text, metadata |
| `--color-border-subtle` | Default hairline border |
| `--color-border-strong` | Emphasized border |
| `--color-accent` | Primary action color (links, primary buttons) |
| `--color-accent-hover` | Hover state for accent |
| `--color-accent-subtle` | Soft accent background (active nav pill, badges) |
| `--color-accent-foreground` | Text placed on top of an accent-colored surface |
| `--color-brand-secondary` | Secondary brand highlight (used sparingly, e.g. hero eyebrow) |
| `--color-focus` | Focus ring color |

Dark mode is `[data-theme="dark"]`, driven by the `--theme` custom variant (`@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))`) — use Tailwind's `dark:` prefix, never a media-query-only approach, since the site supports an explicit user toggle (see `Header.astro`).

Use semantic token names in components (`bg-background-subtle`, `text-foreground-muted`) — never a raw palette step. This matches [Plan 01](../plans/01-content-model-and-cms/index.md)'s and the wider EMVEE design-system's DD-005 decision (semantic tokens over paginagebonden kleuren).

## Known gap: `EmVee-Docs` has a newer token set

`EmVee-Docs/src/styles/global.css` (the separate documentation-site project) has since evolved a richer token set than this repo currently has: `--color-surface` / `--color-surface-strong` / `--color-surface-elevated`, `--color-border` (plain, not just subtle/strong), `--color-foreground-inverse`, `--color-accent-active`, plus `--duration-fast` / `--duration-base` / `--ease-standard` motion tokens and a second `.cta-secondary-gradient` button variant. It also has a more refined theme-switch animation ("paint pour" via `@property --pour`) than this repo's current "splash" effect.

Worth porting into `src/styles/global.css` as a deliberate follow-up (not done as part of this pass, to avoid silently changing visual output) — flag this if the two projects should stay in sync going forward.

## Typography

- **Chocopie** (local, `astro.config.mjs` → `fontProviders.local()`) — headings, nav, buttons, labels. Weights actually loaded: 100/300/400/700/900. Never simulate 500/600 — Chocopie doesn't have them natively.
- **Geist** (Fontsource, `fontProviders.fontsource()`) — body copy, forms, general interface text.
- **Geist Mono** (Fontsource) — code and technical values.

CSS variables: `--font-heading` (Chocopie stack), `--font-content` (Geist stack), `--font-code` (Geist Mono stack) — see `global.css` `@theme inline` block for how these map to Tailwind's `font-sans`/`font-serif`/`font-mono`.

Rules carried over from the design-system docs that still apply in code:
- One `<h1>` per page.
- `text-wrap: balance` is already global for all headings (`global.css`) — don't re-add it per component.
- Body text never smaller than 16px (`text-base` / 1rem).
- `font-synthesis: none` is already set globally — don't let a component request a weight that isn't loaded.

## Spacing

No `--space-*` custom properties exist yet in this repo (unlike the fuller design-system doc's 4px-based scale) — components currently use Tailwind's default spacing scale directly (`px-6 py-10 md:px-12 lg:px-20 lg:py-28`, as in `Hero.astro`). Keep using Tailwind's scale for consistency with existing components rather than introducing a parallel token system, unless a real cross-component need for a custom scale emerges.

Section padding pattern to reuse (from `Hero.astro`):
```
px-6 py-10 md:px-12 lg:px-20 lg:py-28
```

## Motion

- Respect `prefers-reduced-motion: reduce` on every new animation — two existing examples to follow: `Header.astro`'s `setTheme()` (skips the view-transition splash entirely) and `global.css`'s `.cta-gradient` media query (`transition-duration: 1ms`).
- No timing tokens exist yet in this repo's `global.css` (the `EmVee-Docs` copy has `--duration-fast`/`--duration-base`/`--ease-standard` — see the gap noted above). Until those are ported, use plain values matching the design-system doc's scale: 120ms (hover/small color change), 180ms (buttons/links/inputs), 280ms (accordion/dropdown), 420ms max (large one-off transitions).
- See [Plan 05: Animation (Motion)](../plans/05-animation-motion/index.md) for how the `motion` package will be introduced on top of this.

## Icons

`Icon.astro` uses a fixed, hand-maintained union of inline SVGs (currently: `arrow-right-linear`, `hamburger-menu-linear`, `close-circle-linear`, `moon-linear`, `sun-2-linear`) — no icon library dependency, `currentColor` stroke, `aria-hidden` by default unless a `label` is passed. Extend the union in that file rather than introducing a second icon system; keep stroke-width `1.8` consistent with the existing icons.

## Components follow meaning, not appearance

When adding a new component (see [Plan 03](../plans/03-component-library/index.md)), name it for what it represents (`CardGrid`, `StepList`, `ContactDetails`), not for how it looks (`BlueBox`, `ThreeColumnThing`). Don't add a new one-off component type if an existing generic one already fits — this repo intentionally uses a small set of reusable section types (`intro`, `textBlock`, `cardGrid`, `stepList`, `cta`, `contactDetails`) rather than a bespoke component per page.
