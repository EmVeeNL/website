---
task: 02-build-cta-section-component
plan: 03-component-library
status: planned
---

# Task: Build CTA section component

## Goal

Create `src/components/Cta.astro` rendering the `cta` schema (heading, text,
one or two `actionSchema` actions) as a full-width band, reusing the
`.cta-gradient` button style already defined in `src/styles/global.css`.

## Steps

- [ ] Define local `CtaContent` prop type
- [ ] Reuse the exact primary/secondary action markup pattern from
      `Hero.astro` (lines rendering `hero.primaryAction`/`secondaryAction`)
      rather than re-inventing button styles
- [ ] Section background: use `--color-background-subtle` or
      `--color-accent-subtle` to visually separate from surrounding sections
- [ ] Add one example content entry to verify

## Acceptance criteria

- Button markup is visually and structurally consistent with Hero's CTAs
  (same focus ring, hover transform, icon usage)
- Passes `astro check`

## Related files

- `src/components/Hero.astro`
- `src/styles/global.css` (`.cta-gradient`)
