---
task: 05-knowledge-page
plan: 04-page-rollout-nl-en
status: done
---

# Task: Knowledge page

## Goal

Create `pages` collection entries for `knowledge` at `nl: /kennis` and
`en: /en/knowledge`, rendering `ArticleList.astro` (Plan 03) from the
`knowledge` collection — same listing-page pattern as Projects.

## What's built

`kennis.md`/`knowledge.md` didn't exist before this task at all (unlike
Projecten, which already had supporting sections built — Kennis was
entirely new). Structure: `intro` → `knowledgeListing` → `cta`, same
"anchor component type" pattern as Projects
(`type: "knowledgeListing"`). Since `EmVee-Docs` has no source copy for
this page, the intro/CTA text is original, written in-house rather than
sourced from the docs repo — worth a content review pass later. 2 nl + 2 en
placeholder articles populated.

## Acceptance criteria

- Listing shows only entries matching the page's language, sorted newest
  first — confirmed: `ArticleList.astro` sorts by `publishedAt` descending
  itself, verified with the 2 nl entries (2026-07-01 before 2026-06-15)
