---
task: 03-process-assets
plan: 07-asset-production
status: planned
---

# Task: Process / Werkwijze assets

## Scope

From [`../../docs/image-prompts/03-process.md`](../../docs/image-prompts/03-process.md) — one scene per phase (#1–#10 map 1:1 to the `stepList` steps: Eerste gesprek → Langdurige samenwerking), plus #11 "Scope" and #12 "Full process" for the closing `textBlock`/`cta` sections.

Given the `stepList` component currently renders text-only steps, decide whether per-step imagery is worth the added visual weight on what's meant to be a calm, text-forward page, or whether just #12 "Full process" as a single header image is enough. Default recommendation: start with just #12, add per-step images only if the page reads as too plain in review.

## Steps

- [ ] Decide scope (single header image vs. per-step images) before generating anything
- [ ] Generate, review, and place the chosen scene(s)
- [ ] If per-step images are chosen, add an optional `image` field to `stepListSchema`'s step objects in `content.config.ts`

## Related files

- `src/content/components/nl/werkwijze/`
- `src/content/components/en/process/`
