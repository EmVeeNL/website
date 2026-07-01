---
plan: 01-content-model-and-cms
status: planned
---

# Plan 01: Content Model & CMS

## Objective

Extend the existing Content Collections schema (`src/content.config.ts`) so every
section the site needs (features, CTA, testimonials, projects, knowledge
articles, contact) has a typed schema, and keep the Frontmatter CMS config
(`frontmatter.json`) in sync so non-technical editing stays possible without a
hosted CMS.

## Background

The `pages` + `components` collection pattern is already in place and proven
for the homepage hero (`src/content/pages/nl/home.md` references
`src/content/components/nl/home/hero.md` via a `components[].ref` array,
resolved in `src/pages/index.astro`). `heroSchema` is the only component
schema defined so far, inside a `z.discriminatedUnion("type", [...])`.

Frontmatter (VS Code extension, git-based, no server) is already configured
in `frontmatter.json` with content type definitions mirroring the Zod schema
by hand — these two must be kept in lockstep since Frontmatter doesn't read
the Zod schema directly.

Two kinds of content still need modeling:
1. **Section components** — reusable blocks referenced from a page's
   `components[]` list (same pattern as hero).
2. **Repeatable collections** — projects and knowledge articles are lists of
   independent entries with their own detail pages, not just page sections.

## Tasks

1. [Design remaining section component schemas](01-design-remaining-section-component-schemas.md)
2. [Design projects & knowledge collections](02-design-projects-and-knowledge-collections.md)
3. [Sync Frontmatter CMS taxonomy](03-sync-frontmatter-cms-taxonomy.md)

## Out of scope

- Building the Astro components that render these schemas (see
  [Plan 03: Component Library](../03-component-library/index.md)).
- Populating real page content (see
  [Plan 04: Page Rollout](../04-page-rollout-nl-en/index.md)).
