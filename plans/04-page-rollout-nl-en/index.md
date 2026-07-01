---
plan: 04-page-rollout-nl-en
status: done (except knowledge)
---

# Plan 04: Page Rollout (NL/EN)

## Objective

Populate real content entries for the remaining 6 nav pages
(`services`, `process`, `projects`, `about`, `knowledge`, `contact`) in both
`nl` and `en`, using the content model from Plan 01.

## Status

Services, Process, Projects, About, and Contact (nl + en) are implemented
using the real copy from `EmVee-Docs/docs/website/content/`, sourced verbatim
rather than placeholder text — see [Plan 01, Task 01](../01-content-model-and-cms/01-design-remaining-section-component-schemas.md)
for the schema this content is mapped into. `pnpm build` passes cleanly, all
12 pages (6 pages × nl/en) generate. Knowledge/Kennis is **not** included —
no real content exists for it yet in the source docs (`Structure.md` only
lists example article titles, not full copy), so it stays open.

This landed ahead of [Plan 02](../02-routing-architecture/index.md)'s dynamic
catch-all route refactor — each new page is a new `src/pages/*.astro` /
`src/pages/en/*.astro` file pair following the existing per-page duplication
pattern (matching `index.astro`/`en/index.astro`), not yet the deduplicated
version Plan 02 describes. Doing the Plan 02 refactor now that 6 page pairs
exist (instead of 1) is worth prioritizing sooner rather than later.

## Background

Only `home` existed before this pass (`src/content/pages/nl/home.md`,
`src/content/pages/en/home.md`). Every other id in
`navigationPages` (`src/config/navigation.ts`) previously 404d.

## Tasks

1. [Services page](01-services-page.md)
2. [Process page](02-process-page.md)
3. [Projects page](03-projects-page.md)
4. [About page](04-about-page.md)
5. [Knowledge page](05-knowledge-page.md)
6. [Contact page](06-contact-page.md)

## Sequencing note

These can be done in any order, but each depends on its corresponding
component(s) from Plan 03 existing first. Do them in the order the business
wants pages live, not necessarily the order listed here.

## Out of scope

- Writing final marketing copy — these tasks cover structure/wiring; actual
  copy is a content task, not an engineering one.
