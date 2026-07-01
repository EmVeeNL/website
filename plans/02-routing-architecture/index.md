---
plan: 02-routing-architecture
status: planned
---

# Plan 02: Routing Architecture

## Objective

Replace the current one-`.astro`-file-per-language-per-page pattern with a
single dynamic route, before adding 6 more nav pages × 2 languages makes the
duplication expensive to maintain.

## Background

`src/pages/index.astro` and `src/pages/en/index.astro` are currently
near-identical: both fetch `pages`/`components` collections, find one entry
by hardcoded `language`/`slug`, resolve its component refs, and switch on
`config.type` to pick a renderer. Rolling out services/process/projects/about/knowledge/contact
in both languages by copy-pasting this file 12 times would duplicate the
component-switch logic 12×, and any new section type (Plan 01) would need
updating in 12 places.

The existing custom i18n routing (`src/config/navigation.ts`) uses fully
independent, translated slugs per language (e.g. `nl: "/diensten"`,
`en: "/en/services"`) rather than a shared `[lang]/[slug]` shape — Astro's
built-in `i18n` router assumes matching slugs across locales, so it doesn't
fit this project. The custom `navigation.ts` approach should stay; only the
page-rendering plumbing should be deduplicated.

## Tasks

1. [Refactor to a dynamic catch-all page route](01-refactor-to-dynamic-catch-all-page-route.md)

## Out of scope

- Changing the URL structure or `navigationPages` translations themselves.
- Migrating to Astro's built-in `i18n` config — the per-language custom
  slugs are a deliberate product requirement, not a gap.
