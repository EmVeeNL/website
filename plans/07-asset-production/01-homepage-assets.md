---
task: 01-homepage-assets
plan: 07-asset-production
status: done (except footer background + hero)
---

# Task: Homepage assets

## Already done

`Hero.astro` already uses `hero-dark.png` / `hero-light.png` (light/dark theme variants) — left untouched per explicit instruction, even though two hero-alternate images (`hero-alternate-built-personally.png`, `hero-alternate-forward-without-haste.png`, matching prompt scenes #2/#3) were generated and are sitting in `src/assets/images/homepage/` unused, available if the Hero ever gets revisited.

## Wired in

Five images generated externally, moved from a stray top-level `images/Homepage/` folder into `src/assets/images/homepage/` (kebab-case filenames), and wired into the actual homepage content + components:

| Scene | File | Section | Component |
|---|---|---|---|
| #6 "Technology as a means" | `technology-as-a-means.png` | Intro ("Techniek moet ondersteunen") | `Intro.astro` — 2-col layout, image right |
| #7 "Services overview" | `services-overview.png` | CardGrid ("Wat EMVEE doet") | `CardGrid.astro` — full-width banner above cards |
| #8 "Process preview" | `process-preview.png` | StepList ("Rust in iedere fase") | `StepList.astro` — full-width banner above steps |
| #10 "Long-term quality" | `long-term-quality.png` | TextBlock ("Gebouwd voor de lange termijn") | `TextBlock.astro` — 2-col layout, image right |
| #11 "First conversation CTA" | `first-conversation-cta.png` | Cta ("Laten we beginnen met begrijpen") | `Cta.astro` — subtle background image + gradient overlay, not a plain banner |

This required a real (small) schema change: `content.config.ts`'s `components` collection schema was converted to the function form (`schema: ({ image }) => ...`) so `image()` could be used, and an optional `image` field added to `intro`/`textBlock`/`cardGrid`/`stepList`/`cta` — available to **every** page using these components going forward, not just home.

**Sharp had to be explicitly installed** (`pnpm add -D sharp` + `pnpm approve-builds --all`) — it was present transitively but its native build script was being silently skipped by pnpm, so `astro:assets` image optimization failed with `MissingSharp` until this was fixed. Now a permanent devDependency, not a one-off fix.

## Still unused

- **#9 "Trust"** (`trust.png`) — generated, sitting in `src/assets/images/homepage/`, no current section maps to it. Use if a trust-focused section gets added.
- **#12 "Footer brand image"** — not generated yet; the real footer (closed in a separate PR) doesn't currently use a background image.
- The two hero alternates noted above.

## Verified

Real browser screenshots (temporary Playwright + a locally-cached Chromium, same pattern as prior plans) of all five wired sections in light mode — confirmed correct layout, no console errors, and that `astro:assets` actually optimized the images (~1.4–2.0MB PNGs → 13–30KB WebP).

## Related files

- `src/components/Hero.astro` (untouched, reference pattern only)
- `src/content.config.ts`
- `src/components/Intro.astro`, `TextBlock.astro`, `CardGrid.astro`, `StepList.astro`, `Cta.astro`
- `src/content/components/{nl,en}/home/{intro,services,calm-steps,long-term,cta}.md`
- `src/assets/images/homepage/`
