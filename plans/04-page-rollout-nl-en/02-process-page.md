---
task: 02-process-page
plan: 04-page-rollout-nl-en
status: planned
---

# Task: Process page

## Goal

Create `pages` collection entries for `process` at `nl: /werkwijze` and
`en: /en/process`, referencing a `process` (steps) component entry.

## Steps

- [ ] `src/content/pages/nl/werkwijze.md` and `src/content/pages/en/process.md`
- [ ] Corresponding component entries with ordered steps
- [ ] Verify build + nav active state

## Acceptance criteria

- Page builds and is reachable at both language paths
- Steps render in the correct order (respect the `order` field pattern used
  in `pages.components[]`)
