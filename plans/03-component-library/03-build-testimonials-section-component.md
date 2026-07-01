---
task: 03-build-testimonials-section-component
plan: 03-component-library
status: planned
---

# Task: Build Testimonials section component

## Goal

Create `src/components/Testimonials.astro` rendering the `testimonials`
schema (quote list) as either a static grid or a simple horizontal scroll —
no JS carousel dependency, keep it static-first per the project's
zero-JS-by-default goal.

## Steps

- [ ] Define local `TestimonialsContent` prop type
- [ ] Default to a CSS-only layout (grid or `overflow-x-auto` snap scroll)
      rather than a JS carousel library
- [ ] Quote styling: use `--font-heading` for the quote text if it should
      stand out, `--color-foreground-muted` for attribution
- [ ] Add one example content entry to verify

## Acceptance criteria

- No new JS dependency introduced
- Passes `astro check`

## Related files

- `src/components/Hero.astro` (typography token reference)
