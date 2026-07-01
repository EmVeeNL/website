---
task: 06-contact-page
plan: 04-page-rollout-nl-en
status: planned
---

# Task: Contact page

## Goal

Create `pages` collection entries for `contact` at `nl: /contact` and
`en: /en/contact`, rendering `ContactForm.astro` (Plan 03) — this is the
page the header/footer CTA buttons already link to via
`getRoutePath("contact", activeLanguage)` in `Header.astro`.

## Steps

- [ ] `src/content/pages/nl/contact.md` and `src/content/pages/en/contact.md`
- [ ] Confirm the form submission path decided in
      [Plan 03, Task 05](../03-component-library/05-build-contact-form-component.md)
      is live before shipping this page publicly
- [ ] Verify build + nav active state

## Acceptance criteria

- Page builds and is reachable at both language paths
- Form actually delivers submissions somewhere (not a dead-end placeholder)
  before this is considered done
