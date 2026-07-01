---
task: 07-homepage-content-seo
plan: 04-page-rollout-nl-en
status: done
---

# Task: Homepage content, UX and SEO rework

Full content restructure of the homepage (nl + en) per an explicit brief:
clearer, more concise, more personal, more scannable, stronger for organic
search, less dependent on large decorative images. Hero was explicitly kept
untouched (already matched the target copy direction).

## New section order

`hero` (unchanged) → `brand-intro` → `services` → `why-emvee` → `process` →
`proof` → `quality` → `personal` → `cta` → footer.

Two prior sections (`long-term`, `no-noise`) were retired — their content
overlapped with the new `why-emvee`/`quality` sections and the brief
explicitly says not to create unnecessary sections or repeat brand claims
across sections.

## Schema/component changes (not homepage-specific — available to any page)

- `intro`: new `headingStyle: "default" | "editorial"` — editorial renders
  the heading in Lora (new font, `fontProviders.fontsource()`, restrained
  editorial accent per `DESIGN_SYSTEM.md`), used for the brand introduction.
- `cardGrid`: new `variant: "cards" | "plain"` (plain drops the
  border/background box for principle-style lists), `columns: "2"|"3"|"4"`,
  and a per-item `link` (descriptive anchor, distinct from the section-level
  `action`).
- `stepList`: same `columns` option, for the reduced 4-step homepage process
  (existing pages with more steps default to `columns: "3"` unchanged).
- `pages` collection: new optional `ogImage` (uses `image()`, wired through
  `PageRenderer.astro` → `BaseLayout.astro` as an absolute URL for
  `og:image`/`twitter:image`).

## SEO

- `BaseLayout.astro`: added Open Graph + Twitter Card meta tags, and
  site-wide `ProfessionalService` + `WebSite` JSON-LD. Deliberately minimal
  — only facts already public elsewhere on the site (name, Mook NL,
  Netherlands-wide service area). No phone/email (not set yet), no `Person`
  (no confirmed public founder name in `EmVee-Docs`), no ratings/reviews.
- Homepage `seo.title`/`seo.description` rewritten to the brief's exact
  recommended direction for nl; en translated equivalently.
- Internal links confirmed present to all 6 nav routes from the homepage.
  Service links point to `/diensten` (`/en/services`) since no per-service
  routes exist yet — noted as a possible follow-up, not built here.

## Images

Kept 3 of the 5 previously-wired homepage images (brand-intro, personal,
cta-background) — all abstract/editorial, matching the brief's image
direction. Dropped 2 (`services-overview.png`, `process-preview.png`):
both are isometric 3D icon-row illustrations, which the brief explicitly
lists under "do not use" (generic tech illustrations, rows of
devices/platforms). Services and Process are now text-only sections.

## Verified

Real browser (temporary Playwright + locally-cached Chromium): every new
section screenshotted in light and dark mode (nl), heading hierarchy
checked in the rendered DOM (single h1, no skipped levels), all 6 internal
nav links confirmed present, `pnpm build` succeeds (still 27 pages — this
was a content rework, not new pages), zero console errors.

## Related files

- `src/content.config.ts`, `astro.config.mjs`, `src/styles/global.css`
- `src/components/Intro.astro`, `CardGrid.astro`, `StepList.astro`,
  `BaseLayout.astro`, `PageRenderer.astro`
- `src/content/pages/{nl,en}/home.md`
- `src/content/components/{nl,en}/home/*.md`
