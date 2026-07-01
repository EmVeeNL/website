---
task: 01-refactor-to-dynamic-catch-all-page-route
plan: 02-routing-architecture
status: done
---

# Task: Refactor to a dynamic catch-all page route

## Goal

Replace `src/pages/index.astro` + `src/pages/en/index.astro` (and every
future per-page-per-language file) with one dynamic route file plus a shared
render helper, driven by `getStaticPaths()` over the `pages` collection.

## Why

Today, adding "services" means creating `src/pages/diensten.astro` and
`src/pages/en/services.astro`, each duplicating the collection lookup +
component-type switch from `index.astro`. Multiply by 6 remaining nav pages
and every future section type from Plan 01, and the switch statement drifts
out of sync across files. A single route removes that duplication entirely.

## Design

- `src/pages/[...slug].astro` using `getStaticPaths()`:
  - `export async function getStaticPaths()` maps every entry in the `pages`
    collection to a route, using `entry.data.slug` (already present in the
    schema, e.g. `/`, `/en`, `/diensten`, `/en/services`) as the `params.slug`
  - Note: the root path `/` needs `params.slug: undefined` handling since
    Astro rest params don't match empty string automatically — confirm
    against current Astro docs during implementation
- Extract the component-resolution + switch logic from `index.astro`
  (lines resolving `page.data.components` against `componentEntries`, and
  the `if (config.type === "hero") return <Hero .../>` chain) into a shared
  `src/components/PageRenderer.astro` that takes a resolved `page` entry and
  renders all its components generically:
  ```
  {components.map(({ config, entry }) => {
    switch (config.type) {
      case "hero": return <Hero hero={entry.data} />;
      case "features": return <Features features={entry.data} />;
      // one line per type from Plan 01
    }
  })}
  ```
- `BaseLayout` usage (title/description/lang) stays the same, just called
  from the one route file instead of twelve

## Steps

- [x] Create `src/components/PageRenderer.astro` with the extracted
      resolution + switch logic (parametrize error messages to reference the
      actual page instead of hardcoding "home")
- [x] Create `src/pages/[...slug].astro` using `getStaticPaths()` over the
      `pages` collection
- [x] Delete `src/pages/index.astro` and `src/pages/en/index.astro`,
      replacing their behavior via the new route + one `home.md` entry each
- [x] Confirm `astro build` produces the same `dist/index.html` and
      `dist/en/index.html` output as before the refactor
- [x] Confirm 404 behavior is unchanged for unknown slugs

## Acceptance criteria

- `pnpm build` succeeds and output paths for `/` and `/en` are byte-equivalent
  in structure to the pre-refactor build
- Adding a new page going forward only requires a new `pages` collection
  entry + its component entries — zero new `.astro` route files

## Related files

- `src/pages/index.astro`, `src/pages/en/index.astro` (to be removed)
- `src/content.config.ts`
- `src/layouts/BaseLayout.astro`
