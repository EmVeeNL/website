---
task: 01-homepage-assets
plan: 07-asset-production
status: planned
---

# Task: Homepage assets

## Already done

`Hero.astro` already uses `hero-dark.png` / `hero-light.png` (light/dark theme variants) — don't regenerate these without a specific reason; they're the one homepage image already integrated.

## Still needed

From [`../../docs/image-prompts/01-homepage.md`](../../docs/image-prompts/01-homepage.md), scenes not yet used by any component:

- **#6 "Technology as a means"** (4:3) — for the `intro` section ("Techniek moet ondersteunen")
- **#7 "Services overview"** (16:10) — above the `cardGrid` services section ("Wat EMVEE doet")
- **#8 "Process preview"** (16:9) — for the `stepList` section ("Rust in iedere fase")
- **#9 "Trust"** (3:2) — optional, no current section maps directly to this; only use if a trust-focused section gets added
- **#10 "Long-term quality"** (16:10) — for the `textBlock` "Gebouwd voor de lange termijn"
- **#11 "First conversation CTA"** (16:9) — for the closing `cta` section
- **#12 "Footer brand image"** (21:9) — background for the real footer, once [Plan 00, Task 04](../00-project-foundations/04-header-footer-navigation.md)'s footer gap is closed

Scenes #1–#5 are hero alternatives — skip unless the current hero images are being replaced.

## Steps

- [ ] Generate and review each needed scene per the process in the plan index
- [ ] Add an optional `image` field to the relevant component schemas in `content.config.ts` if a section should support one (`intro`, `textBlock`, `cardGrid`, `stepList`, `cta` currently have no image field — check whether adding one is worth the schema churn versus keeping these sections text-only for now)
- [ ] Wire into the corresponding Astro component using `astro:assets`

## Related files

- `src/components/Hero.astro` (reference pattern for image import + light/dark swap)
- `src/content.config.ts`
