---
task: 01-design-remaining-section-component-schemas
plan: 01-content-model-and-cms
status: implemented
---

# Task: Design remaining section component schemas

## Goal

Add Zod schemas for the section types needed on the services, process,
projects, about, and contact pages beyond hero, following the exact pattern of
`heroSchema` in `src/content.config.ts`.

## Why

Every page is assembled from `components[]` entries resolved against the
`components` collection (see `src/pages/index.astro`). Without schemas for
these types, content authors have no validated way to add them and the page
renderer has nothing to switch on.

## Resolution

Superseded the originally-guessed type list below once the real page content
was pulled from `EmVee-Docs/docs/website/content/`. That content is long-form
prose organized under `##`/`###` headings, bullet lists, and closing CTAs —
not feature-card grids. Rather than one schema per page's specific section
names, six small **generic, reusable** types cover every page's actual
structure, matching the design-system's "components follow meaning, not
one-off appearance" principle:

- `intro` — eyebrow?, heading, body[], list?, primaryAction?, secondaryAction?
  (the non-hero page openers, e.g. Diensten's "Digitale oplossingen met een
  duidelijke functie")
- `textBlock` — heading?, body[], list?, listStyle ("bullet" | "number")
  (prose sections like Werkwijze's "Communicatie", About's "Waarom EMVEE
  bestaat")
- `cardGrid` — eyebrow?, heading?, intro?, items: {title, description, list?}[],
  action? (home's "Wat EMVEE doet", Diensten's 8 services, About's 6 values,
  Projecten's case-structure breakdown)
- `stepList` — eyebrow?, heading?, intro?, steps: {title, description?, list?}[],
  action? (home's 6-step preview, Werkwijze's 10 full phases)
- `cta` — heading, text[], primaryAction?, secondaryAction? (every page's
  closing call-to-action band)
- `contactDetails` — email, phone, location, note? (Contact page only)

~~`features` / `process` / `testimonials` / `stats`~~ (original guess,
replaced — testimonials/stats aren't used by any real page content found;
add them later only if real content needs them, per DD-012 in
`EmVee-Docs/docs/website/DESIGN_DECISIONS.md`: don't abstract ahead of proven
repetition).

## Steps

- [x] For each type, extend `componentBaseSchema` exactly like `heroSchema` does
- [x] Add each new schema to the `componentSchema` discriminated union
- [x] Reuse `actionSchema` for any CTA/action fields instead of redefining it
- [x] Keep field names consistent with existing hero fields where the concept
      overlaps (e.g. `primaryAction`/`secondaryAction`, not `cta`/`button`)
- [x] Populate real content entries for home (additions after hero),
      diensten/services, werkwijze/process, projecten/projects,
      over-emvee/about, and contact — nl and en — sourced verbatim from
      `EmVee-Docs/docs/website/content/`

## Acceptance criteria

- `npx astro check` (or `astro build`) passes with the new schemas
- Each new type has a literal `type` discriminant matching its Frontmatter
  content type name (see Task 03 — Frontmatter taxonomy still needs updating
  for these six types, that part is not yet done)

## Related files

- `src/content.config.ts`
- `src/content/components/nl/home/hero.md` (reference pattern, untouched)
