---
task: 02-services-assets
plan: 07-asset-production
status: planned
---

# Task: Services / Diensten assets

## Scope

From [`../../docs/image-prompts/02-services.md`](../../docs/image-prompts/02-services.md) — 20 scenes, one or two per service in the Diensten `cardGrid` (Websites, Web apps, E-commerce, Frontend, Backend, Consulting, Review, AI/automation, Integrations, Security, Performance, Modernisation, Maintenance, Custom software).

Not every `cardGrid` item needs its own image — the design-system docs favor restraint over illustrating every single card. Recommend: pick 1 representative scene per top-level service (Websites #1 or #2, Web apps #3 or #4, E-commerce #5 or #6, Frontend #7 or #8, Backend #9 or #10, Consulting #12) and skip images for the more niche items (Integrations, Security, Modernisation, Performance, Maintenance, Custom) unless a design review decides otherwise.

## Steps

- [ ] Confirm with whoever owns visual design which subset of the 20 scenes actually gets used — don't generate all 20 speculatively
- [ ] Generate, review, and place the chosen subset
- [ ] Decide whether `cardGrid` items need an `image` field added to their schema (`content.config.ts`) or whether images live at the section level only

## Related files

- `src/content/components/nl/diensten/services.md`
- `src/content/components/en/services/services.md`
