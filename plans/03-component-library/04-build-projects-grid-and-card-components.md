---
task: 04-build-projects-grid-and-card-components
plan: 03-component-library
status: planned
---

# Task: Build Projects grid & card components

## Goal

Create `src/components/ProjectCard.astro` and `src/components/ProjectsGrid.astro`
to render entries from the `projects` collection (Plan 01, Task 02) — used
both on the projects listing page and potentially as a "featured projects"
section elsewhere.

## Steps

- [ ] `ProjectCard.astro`: cover image (via `astro:assets` `<Image>` if the
      schema uses the `image()` helper — confirm decision from Plan 01 Task 02),
      title, summary, tags, link to detail page
- [ ] `ProjectsGrid.astro`: takes an array of project entries, lays out cards
      responsively (reuse the grid breakpoints from Features)
- [ ] Confirm whether project detail pages are in scope now or a later plan —
      if in scope, this task also needs a `src/pages/[lang]/projecten/[slug].astro`-style
      route (coordinate with [Plan 02](../../02-routing-architecture/index.md)
      to decide if the catch-all route can handle collection detail pages too,
      or if a separate dynamic route is cleaner)

## Acceptance criteria

- Cards render correctly with and without optional fields (e.g. missing `client`)
- Images use `astro:assets` optimization, not raw `<img src>` with unoptimized paths

## Related files

- `src/content.config.ts` (`projects` collection, once added)
- `src/components/Hero.astro` (image handling reference — note Hero currently
  uses raw `.src` imports; check current Astro `astro:assets` `<Image>` best
  practice before deciding which pattern to follow here)
