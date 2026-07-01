---
task: 05-about-assets
plan: 07-asset-production
status: planned
---

# Task: About / Over EMVEE assets

## Blocking dependency

Scenes #1–#4 in [`../../docs/image-prompts/05-about.md`](../../docs/image-prompts/05-about.md) (founder portraits, working portrait, listening) explicitly require a **real, current reference photo of the founder** supplied to the generator — per `docs/image-prompts/00-foundation.md`, don't attempt to generate a founder likeness from scratch. Get that reference photo before starting this task.

## Scope once unblocked

- #1 or #2 (light/dark founder portrait) — for the `intro` section
- #6–#9 (value cards: trust/calm/attention/responsibility) — for the `cardGrid` "Waar EMVEE in gelooft" (6 values: Rust, Duidelijkheid, Vertrouwen, Persoonlijkheid, Kwaliteit, Eenvoud — only 4 of the 6 have a directly-matching prompt scene; the other two (Duidelijkheid, Persoonlijkheid) don't have a dedicated scene in the source library, so either reuse a close match or treat the value cards as text-only)
- #10 "Mook and national reach" or #11 "Personal agency" — for the "Niet groter dan nodig" / location context
- #12 "Brand manifesto" — optional, for the closing `cta`

## Steps

- [ ] Obtain and store the founder reference photo (not committed to the public repo — check where sensitive/personal reference material should live before adding it anywhere)
- [ ] Generate scenes #1–#2, review for likeness accuracy and brand-palette consistency
- [ ] Generate the value-card and location scenes
- [ ] Decide on the 2 values without a matching prompt scene: no image, or a bespoke prompt following the same style block

## Related files

- `src/content/components/nl/over-emvee/`
- `src/content/components/en/about/`
