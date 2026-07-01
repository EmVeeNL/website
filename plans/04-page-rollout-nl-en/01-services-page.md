---
task: 01-services-page
plan: 04-page-rollout-nl-en
status: planned
---

# Task: Services page

## Goal

Create `pages` collection entries for `services` at `nl: /diensten` and
`en: /en/services` (paths already defined in `navigationPages` in
`src/config/navigation.ts`), each referencing a `features` component entry
(Plan 01/03) and optionally a `cta` band at the bottom.

## Steps

- [ ] `src/content/pages/nl/diensten.md` and `src/content/pages/en/services.md`
      with `slug` matching the nav config exactly
- [ ] Corresponding component entries under
      `src/content/components/nl/diensten/` and `.../en/services/`
- [ ] Verify the page appears correctly via the dynamic route (Plan 02) and
      the nav link in `DesktopNavigation.astro`/`MobileNavigation.astro`
      correctly shows it as active (`isActive` logic in `navigation.ts`)

## Acceptance criteria

- Page builds and is reachable at both language paths
- Nav highlights "Diensten"/"Services" as active when visiting the page
