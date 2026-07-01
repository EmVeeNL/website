---
task: 03-projects-page
plan: 04-page-rollout-nl-en
status: planned
---

# Task: Projects page

## Goal

Create `pages` collection entries for `projects` at `nl: /projecten` and
`en: /en/projects`, rendering `ProjectsGrid.astro` (Plan 03) populated from
the `projects` collection (Plan 01) rather than a `components[]` ref, since
this is a listing page over a separate collection.

## Steps

- [ ] `src/content/pages/nl/projecten.md` and `src/content/pages/en/projects.md`
      — these can have an empty/minimal `components[]` since the grid pulls
      from the `projects` collection directly, not from a component entry
- [ ] Decide in `PageRenderer.astro` (Plan 02) how a page signals "render a
      collection listing here" vs "render these named components" — likely a
      dedicated `type: "projects-listing"` component entry that just anchors
      position, with the grid querying `getCollection("projects")` filtered
      by `language`
- [ ] Populate at least 2-3 real or placeholder `projects` entries per
      language to verify the grid

## Acceptance criteria

- Listing shows only entries matching the page's language
- Adding a new project entry requires no code change, only a new content file
