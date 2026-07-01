---
task: 05-build-contact-form-component
plan: 03-component-library
status: planned
---

# Task: Build Contact form component

## Goal

Create `src/components/ContactForm.astro` for the contact page. Since the
site is static (no server runtime by default), form submission needs a
plan: either a Cloudflare Worker/Pages Function endpoint, or a third-party
form backend (e.g. a static-friendly form service).

## Why this needs a decision before building

Deployment target is Cloudflare Workers Static Assets
([Plan 06](../../06-deployment-cloudflare/index.md)). A same-origin form
handler is possible there (a Worker route alongside the static assets), but
that's a deployment-architecture decision, not just a component-styling one.
Flag this for a quick decision before writing the submit logic.

## Steps

- [ ] Decide submission path: same-origin Worker endpoint vs third-party
      form service vs `mailto:` fallback for MVP
- [ ] Build the static form markup first (fields, labels, validation
      attributes) independent of that decision — this part isn't blocked
- [ ] Client-side: minimal vanilla JS for submit handling (no framework
      needed), progressive enhancement — form should still work with JS disabled
      if using a plain POST to a Worker endpoint
- [ ] Accessible error/success states (aria-live region), matching the focus
      ring and color tokens used elsewhere

## Acceptance criteria

- Form is usable and validates without JavaScript (native HTML validation
  attributes as the baseline)
- Submission path decision is documented in this file once made

## Related files

- `src/config/navigation.ts` (contact route)
- [Plan 06: Deployment](../../06-deployment-cloudflare/index.md)
