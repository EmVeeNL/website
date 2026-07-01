---
task: 06-build-knowledge-article-list-and-card-components
plan: 03-component-library
status: planned
---

# Task: Build Knowledge article list & card components

## Goal

Create `src/components/ArticleCard.astro` and `src/components/ArticleList.astro`
for the `knowledge` collection (Plan 01, Task 02), mirroring the
Projects grid/card split.

## Steps

- [ ] `ArticleCard.astro`: title, excerpt, formatted `publishedAt` date, tags
- [ ] `ArticleList.astro`: array of entries, sorted by `publishedAt` descending
- [ ] Date formatting: use `Intl.DateTimeFormat` with the page's `language`
      (`nl-NL` / `en-GB` or similar) rather than a hardcoded locale
- [ ] Coordinate with [Plan 02](../../02-routing-architecture/index.md) on
      whether article detail pages use the same catch-all route or a
      dedicated one (same open question as Projects)

## Acceptance criteria

- Dates render correctly in both `nl` and `en`
- List sorts correctly with mixed/missing optional fields

## Related files

- `src/content.config.ts` (`knowledge` collection, once added)
- `src/components/ProjectCard.astro` (sibling pattern)
