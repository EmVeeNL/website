---
task: 03-animate-hero-and-section-reveals
plan: 05-animation-motion
status: planned
---

# Task: Animate hero and section reveals

## Goal

Add entrance animation to `Hero.astro`'s heading/text/CTAs on page load, and
scroll-triggered reveal animations to section components built in
[Plan 03](../../03-component-library/index.md) (Features, Testimonials, CTA, etc.).

## Steps

- [ ] Hero: staggered fade/slide-in for eyebrow → heading → text → actions →
      points on initial load
- [ ] Section reveals: use Motion's `inView`/scroll-triggered utilities to
      animate sections as they enter the viewport (once per element, not on
      every scroll re-entry)
- [ ] Keep `fetchpriority="high"` hero images untouched — don't delay or
      animate the LCP image itself, only the text/CTA content
- [ ] Verify Core Web Vitals aren't regressed (no CLS from animated elements
      taking up different space before/after animation — reserve layout
      space upfront)
- [ ] `prefers-reduced-motion: reduce` guard on all of the above

## Acceptance criteria

- No layout shift introduced (check via browser dev tools or Lighthouse)
- LCP is not delayed by the animation setup
- Animations respect reduced-motion preference

## Related files

- `src/components/Hero.astro`
- `src/components/Features.astro`, `Cta.astro`, `Testimonials.astro` (from Plan 03)
