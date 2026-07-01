---
task: 02-design-projects-and-knowledge-collections
plan: 01-content-model-and-cms
status: planned
---

# Task: Design projects & knowledge collections

## Goal

Add two new top-level Content Collections — `projects` and `knowledge` — for
content that has its own detail page and listing page, unlike section
components which only ever live inside a parent page.

## Why

The nav (`src/config/navigation.ts`) has `projects` and `knowledge` as
top-level pages. These aren't a fixed section on one page — they're
repeatable entries (case studies, articles) each needing their own URL.
Modeling them as `components[]` entries (like hero) would be wrong: a
project isn't "part of" the projects page, it's independently addressable.

## Design

Add two new `defineCollection` entries in `src/content.config.ts`, loaded via
`glob` the same way `pages` and `components` are:

```
src/content/projects/nl/*.md
src/content/projects/en/*.md
src/content/knowledge/nl/*.md
src/content/knowledge/en/*.md
```

Suggested schema shape (adjust once real content is known):

**projects**: `title`, `slug`, `language`, `summary`, `client` (optional),
`year` (optional), `cover` (image path), `tags` (string array), `body`
(markdown content), `status` (reuse `statusSchema`), `seo` (reuse the same
shape as `pages.seo` — consider extracting a shared `seoSchema` to avoid
duplication)

**knowledge**: `title`, `slug`, `language`, `excerpt`, `publishedAt` (date),
`cover` (optional), `tags` (string array), `body`, `status`, `seo`

## Steps

- [ ] Extract `seoSchema` as a shared const if it's about to be reused 3+
      times (currently only defined once inline on `pages`)
- [ ] Define `projects` and `knowledge` collections with `glob` loaders
- [ ] Decide whether cover images use `image()` helper from `astro:content`
      (recommended — gives automatic optimization/validation) vs plain string path
- [ ] Add one example entry per language per collection to validate the schema

## Acceptance criteria

- `astro build` passes with example entries present
- Both collections support `nl` and `en` independently (no assumption that
  every project/article exists in both languages — check `available` logic
  similar to `getLanguageSwitcherItems` in `src/config/navigation.ts`)

## Related files

- `src/content.config.ts`
- `src/config/navigation.ts` (for the `projects`/`knowledge` nav ids)
