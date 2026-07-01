---
task: 04-build-projects-grid-and-card-components
plan: 03-component-library
status: done
---

# Task: Build Projects grid & card components

## Goal

Create `src/components/ProjectCard.astro` and `src/components/ProjectsGrid.astro`
to render entries from the `projects` collection (Plan 01, Task 02) — used
both on the projects listing page and potentially as a "featured projects"
section elsewhere.

## What's built

- `ProjectCard.astro`: cover image via `astro:assets`' `<Image>` (the schema
  uses the `image()` helper), title, summary, `client`/`year` meta line
  (only rendered when present), tags, links to the detail page. Cover is
  optional and simply omitted when absent — no placeholder image, since
  none exist yet (Plan 07 is blocked without an image-generation tool).
- `ProjectsGrid.astro`: takes `projects` + a `basePath` (from
  `getRoutePath("projects", lang)`, so the nl/en URL difference is handled
  by the caller, not hardcoded here), lays out cards in the same
  `sm:grid-cols-2 lg:grid-cols-3` pattern as `CardGrid.astro`. Has an
  `emptyMessage` prop for the zero-results case rather than rendering
  nothing.
- Project detail pages ARE in scope, resolved: `src/pages/projecten/[slug].astro`
  and `src/pages/en/projects/[slug].astro`, each a dedicated `getStaticPaths()`
  route (not the `[...slug].astro` catch-all — that one is keyed to the
  `pages` collection specifically). These coexist without routing conflicts
  since Astro prioritizes static path segments over rest parameters.

## Acceptance criteria

- Cards render correctly with and without optional fields — verified with
  the 2 nl example entries, one with `client`/`year` set and one without
- Images use `astro:assets` optimization — done via `image()` + `<Image>`;
  no entries have a real cover yet to visually verify against, but the
  code path is the same either way

## Related files

- `src/content.config.ts` (`projects` collection)
- `src/components/ProjectCard.astro`, `ProjectsGrid.astro`, `ProjectDetail.astro`
- `src/pages/projecten/[slug].astro`, `src/pages/en/projects/[slug].astro`
