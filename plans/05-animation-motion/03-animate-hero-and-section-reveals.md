---
task: 03-animate-hero-and-section-reveals
plan: 05-animation-motion
status: done
---

# Task: Animate hero and section reveals

## Goal

Add entrance animation to `Hero.astro`'s heading/text/CTAs on page load, and
scroll-triggered reveal animations to section components built in
[Plan 03](../../03-component-library/index.md).

`Features.astro`/`Testimonials.astro` referenced below never got built —
Plan 03 pivoted to six generic section components instead (see that plan's
superseded note). This task applies to the real ones: `Intro`, `TextBlock`,
`CardGrid`, `StepList`, `Cta`, `ContactDetails`, `ContactForm`.

## Steps

- [x] Hero: `[data-hero-stagger]` on the eyebrow, heading, text, actions row,
      and points list; one `animate()` call with `stagger(0.08)` as the
      delay, run on load (not scroll-gated — the hero is always above the
      fold).
- [x] Section reveals: rather than duplicating `inView` calls across seven
      components, built one shared `src/components/ScrollReveal.astro`
      (a script-only component, included once in `BaseLayout.astro`) that
      animates every `[data-reveal]` element in the document. Added that
      attribute to each section component's outer `<section>` — everywhere
      except `Hero.astro`, which uses the load-triggered stagger instead.
- [x] Hero images (`fetchpriority="high"`) are completely untouched — only
      the five `[data-hero-stagger]` text/CTA elements animate.
- [x] No CLS: the hidden/offset state is applied via inline styles set at
      runtime by the animation scripts themselves, not by static CSS —
      elements keep their normal layout box (`opacity`/`transform` only,
      never `display`), so removing/failing the script leaves normal,
      correctly-flowing content rather than a collapsed or shifted layout.
- [x] `prefersReducedMotion()` guards both the Hero script and
      `ScrollReveal.astro` — reduced-motion users get the content
      immediately, no hidden state ever applied.

## Verified with a real browser (Playwright driving a headless Chromium)

Same setup as [Task 02](02-animate-navigation-and-theme-toggle.md) — a
temporary Playwright script against `astro dev`, not just code review:

- Hero: all five `[data-hero-stagger]` elements read `opacity: 1` after the
  stagger completes — confirmed via `getComputedStyle`, plus a full-page
  screenshot showing normal, correctly-positioned content.
- Section reveal: scrolled the first `[data-reveal]` section into view —
  read `opacity: 0` immediately after (still mid-`IntersectionObserver`
  callback), then `opacity: 1` after waiting — a real trigger, not
  pre-rendered visible. Screenshotted the revealed state (the "Techniek
  moet ondersteunen" intro section and "Wat EMVEE doet" cards below it),
  correctly visible, dark mode rendering correctly (screenshot taken after
  the theme-toggle test in the same run).
- Zero browser console errors.

Formal Core Web Vitals measurement (Lighthouse/CrUX) wasn't run — out of
reach without a deployed-and-crawled URL in this pass — but the CLS
mechanism itself (inline-style-only hidden state, no layout removal) is the
same pattern used by the theme icons and mobile menu in Task 02, which did
get pixel-level verification.

## Related files

- `src/components/Hero.astro`
- `src/components/ScrollReveal.astro` (new)
- `src/components/Intro.astro`, `TextBlock.astro`, `CardGrid.astro`, `StepList.astro`, `Cta.astro`, `ContactDetails.astro`, `ContactForm.astro`
- `src/layouts/BaseLayout.astro`
