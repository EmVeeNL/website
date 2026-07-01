---
task: 05-knowledge-page
plan: 04-page-rollout-nl-en
status: planned
---

# Task: Knowledge page

## Goal

Create `pages` collection entries for `knowledge` at `nl: /kennis` and
`en: /en/knowledge`, rendering `ArticleList.astro` (Plan 03) from the
`knowledge` collection — same listing-page pattern as Projects.

## Steps

- [ ] `src/content/pages/nl/kennis.md` and `src/content/pages/en/knowledge.md`
- [ ] Reuse the same "listing" component-entry convention decided in
      [Projects page](03-projects-page.md)
- [ ] Populate 2-3 real or placeholder `knowledge` entries per language

## Acceptance criteria

- Listing shows only entries matching the page's language, sorted newest first
