---
task: 02-design-projects-and-knowledge-collections
plan: 01-content-model-and-cms
status: done
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

- [x] Extracted `seoSchema` as a shared const, now used by `pages`,
      `projects`, and `knowledge`
- [x] Defined `projects` and `knowledge` collections with `glob` loaders
- [x] Cover images use the `image()` helper (`schema: ({ image }) => z.object({ cover: image().optional(), ... })`)
      — optional, since no real images exist yet (Plan 07 is blocked on
      having an actual image-generation tool)
- [x] Added 2 nl + 2 en example entries per collection (8 total), all
      `status: Draft` and `seo.noindex: true` — clearly placeholder content
      (see note below), not real case studies or articles

## What else got built (beyond this task's original scope, but needed to make the collections actually usable)

- `ProjectCard.astro` / `ProjectsGrid.astro`, `ArticleCard.astro` / `ArticleList.astro`
  — closes [Plan 03, Tasks 4 and 6](../03-component-library/index.md)
- Two new anchor component types, `projectsListing` / `knowledgeListing`,
  added to `content.config.ts`'s discriminated union — a page's
  `components[]` references one of these to mark *where* the listing
  renders; `PageRenderer.astro` resolves the actual entries from the
  `projects`/`knowledge` collections (filtered by the page's language), not
  from the component's own frontmatter
- Detail page routes: `src/pages/projecten/[slug].astro`,
  `src/pages/en/projects/[slug].astro`, `src/pages/kennis/[slug].astro`,
  `src/pages/en/knowledge/[slug].astro` — each a `getStaticPaths()` route
  over its collection filtered by language, rendered through
  `ProjectDetail.astro`/`ArticleDetail.astro`. These coexist with the
  `[...slug].astro` catch-all without conflict: Astro prioritizes the more
  specific static-segment routes (e.g. `projecten/[slug]`) over the fully
  dynamic rest route for any path both could technically match.
- Populated `pages/nl/kennis.md` + `pages/en/knowledge.md` (didn't exist
  before at all — `EmVee-Docs` has no source copy for this page, so the
  intro/CTA copy is original, written in-house rather than sourced)
- Wired a `projectsListing` component into the existing `projecten.md`/`projects.md`
  pages (inserted right after the intro, before the existing
  selection-criteria/case-structure/categories sections)

## Deliberately not real content

The 8 example entries are placeholders for schema validation, not real
work: generic titles ("Voorbeeldproject: ..."), `status: Draft`,
`seo.noindex: true` so they can't accidentally get indexed. The knowledge
article topics reuse working titles suggested in
`EmVee-Docs/docs/website/Structure.md`, but the body text is original
placeholder copy — per `EmVee-Docs/docs/website/CONTENT_MAP.md`, the EMVEE
book is context, never direct website content, so book chapters on the
same topics were not copied in. Real project cases and articles are a
content-authoring task, not something to fabricate.

## Acceptance criteria

- `astro build` passes with example entries present — 23 pages build
  cleanly (was 13 before this task)
- Both collections support `nl` and `en` independently — confirmed: the
  listing query filters by `page.data.language`, no assumption that a
  matching entry exists in the other language (and detail pages don't
  attempt cross-language `hreflang` linking for this same reason, unlike
  the `pages` collection which always has a guaranteed nl/en pair)

## Related files

- `src/content.config.ts`
- `src/config/navigation.ts` (for the `projects`/`knowledge` nav ids)
- `src/components/PageRenderer.astro`
- `src/components/ProjectCard.astro`, `ProjectsGrid.astro`, `ProjectDetail.astro`
- `src/components/ArticleCard.astro`, `ArticleList.astro`, `ArticleDetail.astro`
- `src/pages/projecten/[slug].astro`, `src/pages/en/projects/[slug].astro`
- `src/pages/kennis/[slug].astro`, `src/pages/en/knowledge/[slug].astro`
