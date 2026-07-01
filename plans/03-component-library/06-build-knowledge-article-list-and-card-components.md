---
task: 06-build-knowledge-article-list-and-card-components
plan: 03-component-library
status: done
---

# Task: Build Knowledge article list & card components

## Goal

Create `src/components/ArticleCard.astro` and `src/components/ArticleList.astro`
for the `knowledge` collection (Plan 01, Task 02), mirroring the
Projects grid/card split.

## What's built

- `ArticleCard.astro`: title, excerpt, `Intl.DateTimeFormat`-formatted
  `publishedAt` (locale picked from `article.data.language` — `nl-NL` or
  `en-GB`, not hardcoded), tags, optional cover.
- `ArticleList.astro`: sorts entries by `publishedAt` descending itself
  (`toSorted`, doesn't mutate the input array) rather than trusting the
  caller to pre-sort — verified with the 2 nl example entries (one dated
  2026-07-01, one 2026-06-15) rendering newest-first.
- Article detail pages: `src/pages/kennis/[slug].astro` and
  `src/pages/en/knowledge/[slug].astro`, same dedicated-route pattern as
  Projects (not the `[...slug].astro` catch-all).

## Acceptance criteria

- Dates render correctly in both `nl` and `en` — confirmed: nl renders
  "1 juli 2026", en equivalent uses `en-GB` formatting
- List sorts correctly — confirmed with mixed publish dates across the 2
  example entries per language

## Related files

- `src/content.config.ts` (`knowledge` collection)
- `src/components/ArticleCard.astro`, `ArticleList.astro`, `ArticleDetail.astro`
- `src/pages/kennis/[slug].astro`, `src/pages/en/knowledge/[slug].astro`
