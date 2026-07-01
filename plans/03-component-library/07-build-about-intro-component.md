---
task: 07-build-about-intro-component
plan: 03-component-library
status: planned
---

# Task: Build About intro component

## Goal

Create `src/components/AboutIntro.astro` for the "About EMVEE" page —
likely a simple heading + rich text + optional image section, reusing
Hero's typography scale but as a lighter-weight, non-full-height section.

## Steps

- [ ] Define schema first if not already covered by Plan 01 Task 01 (this
      may just reuse a generic "content block" schema rather than needing
      its own — check for overlap with `cta`/`features` before adding a new type)
- [ ] Build the component once the schema is confirmed
- [ ] Keep consistent spacing/typography with `Hero.astro` and `Features.astro`

## Acceptance criteria

- No duplicate schema created if an existing generic block type already covers this need

## Related files

- `src/content.config.ts`
- [Plan 01, Task 01](../../01-content-model-and-cms/01-design-remaining-section-component-schemas.md)
