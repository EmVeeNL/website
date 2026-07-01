---
task: 02-add-sitemap-robots-and-seo-defaults
plan: 06-deployment-cloudflare
status: done
---

# Task: Add sitemap, robots.txt, and SEO defaults

## Goal

Add `@astrojs/sitemap`, a `robots.txt`, and confirm SEO metadata defaults
are correctly wired end-to-end before going live.

## Steps

- [x] `npx astro add sitemap` (requires `site` to be set in `astro.config.mjs`
      — set it to the real production domain once known)
- [x] Add `public/robots.txt` referencing the sitemap URL
- [x] Confirm every page's `seo.title`/`seo.description`/`seo.canonical`
      (schema already exists on the `pages` collection in
      `src/content.config.ts`) is actually rendered into `<head>` — check
      `BaseLayout.astro` currently only takes `title`/`description` props,
      not `canonical` or `noindex`; extend it to use those fields
- [x] Add `hreflang` alternate links between `nl`/`en` versions of the same
      page, using `getLanguageSwitcherItems` from `src/config/navigation.ts`
      as the source of truth for which URL maps to which language

## Acceptance criteria

- `noindex` pages (schema already supports this) actually emit a
  `<meta name="robots" content="noindex">` — currently unused despite being
  in the schema
- `hreflang` tags present and correct on every page with a translated counterpart

## Related files

- `src/layouts/BaseLayout.astro`
- `src/content.config.ts` (`pages.seo`)
- `src/config/navigation.ts`
