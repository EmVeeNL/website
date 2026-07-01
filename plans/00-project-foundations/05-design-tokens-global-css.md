---
task: 05-design-tokens-global-css
plan: 00-project-foundations
status: done
---

# Task: Design tokens (global.css)

## What's in place

`src/styles/global.css` — every color defined as `oklch(L C H)`, semantic tokens (`--color-background`, `--color-foreground-muted`, `--color-accent`, etc.) in `:root` (light) and `[data-theme="dark"]`, exposed to Tailwind via `@theme inline`. Full token list and rationale documented in [`../../docs/STYLEGUIDE.md`](../../docs/STYLEGUIDE.md) — that file also flags a known gap: `EmVee-Docs`'s copy of this same file has since evolved a richer token set (`--color-surface-elevated`, `--color-border`, `--color-accent-active`, motion duration/easing tokens) that hasn't been ported into this repo.

Also in `global.css`: the `dark:` custom variant (`@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))`), base element styles (headings, links, focus rings, `::selection`), the `.cta-gradient` button treatment, and the view-transition theme-splash animation (see [Task 03](03-base-layout-and-theme-toggle.md)).

## Why this shape

OKLCH was chosen specifically so light/dark pairs and muted/subtle text steps could be derived by adjusting lightness on a stable hue, rather than hand-picking a new hex per state. See `../../docs/STYLEGUIDE.md` for the full explanation and the exact token table.

## Related files

- `src/styles/global.css`
- `../../docs/STYLEGUIDE.md`
