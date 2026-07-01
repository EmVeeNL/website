---
task: 01-build-features-section-component
plan: 03-component-library
status: planned
---

# Task: Build Features section component

## Goal

Create `src/components/Features.astro` rendering the `features` schema from
Plan 01 (Task 01) as a responsive grid of icon + title + description cards.

## Steps

- [ ] Define local `FeaturesContent` prop type mirroring the `features` Zod schema
- [ ] Grid layout: 1 column mobile, 2 tablet, 3+ desktop (match the spacing
      scale already used in `Hero.astro`: `px-6 py-10 md:px-12 lg:px-20 lg:py-28`
      for section padding)
- [ ] Each card: `Icon.astro` (extend the `name` union with whatever icons
      the feature set needs), heading (`text-foreground`), description
      (`text-foreground-muted`)
- [ ] Respect `--color-*` tokens from `src/styles/global.css` for
      borders/backgrounds, no new hardcoded colors
- [ ] Add one example content entry and render it on the home page via
      `PageRenderer.astro` (after Plan 02 lands) to visually verify

## Acceptance criteria

- Component has no dark-mode-specific code (works automatically via existing
  `dark:` custom variant)
- Passes `astro check`

## Related files

- `src/components/Hero.astro` (pattern reference)
- `src/components/Icon.astro`
