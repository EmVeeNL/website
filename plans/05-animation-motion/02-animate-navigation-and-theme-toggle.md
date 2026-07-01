---
task: 02-animate-navigation-and-theme-toggle
plan: 05-animation-motion
status: done
---

# Task: Animate navigation and theme toggle

## Goal

Add subtle motion to the mobile menu open/close (`MobileNavigation.astro` +
the `openMenu`/`closeMenu` functions in `Header.astro`) and the theme-toggle
icon swap, replacing the current instant `hidden`/`classList.toggle` swaps
with animated transitions.

## Steps

- [x] Mobile menu: `openMenu`/`closeMenu` now measure `scrollHeight` and
      animate `height`/`opacity` with `animate()`, resolving to `height:
      auto` once open (so responsive reflow — e.g. rotating the device —
      still works). The `hidden` attribute is still used, just applied
      after the close animation finishes instead of instantly.
- [x] Theme icon swap: the moon/sun icons now sit in the same CSS grid cell
      (`grid-area: 1 / 1` in `global.css`, wrapped by a `relative inline-grid`
      span in both `DesktopNavigation.astro` and `MobileNavigation.astro`)
      and crossfade opacity + scale + rotate via two parallel `animate()`
      calls, replacing the old `classList.toggle("hidden", ...)`.
- [x] The existing View Transitions theme-splash effect is untouched — only
      the icon-swap *inside* the toggle button changed.
- [x] Every animated path checks `prefersReducedMotion()` first and applies
      the end state directly via inline styles instead of animating.

## Verified with a real browser (Playwright driving a headless Chromium)

Since no project-specific `run` skill or `chromium-cli` was available, a
temporary Playwright script drove `astro dev` directly (using an already
locally-cached Chromium build) — not just code review:

- Theme toggle: clicking it correctly flips `document.documentElement.dataset.theme`
  to `"dark"`, and the sun icon's opacity is mid-transition at 50ms and
  fully `1` by 450ms — a real crossfade, not an instant swap. Screenshotted
  both before/after states; dark mode renders correctly with no flash.
- Mobile menu: at 80ms into the open animation the element's inline `height`
  is a partial pixel value (`122.239px`), and after the animation completes
  it resolves to `"auto"` — confirms the height genuinely animates and
  doesn't get stuck at a fixed pixel value that would break reflow.
  Screenshotted the fully-open state — correct content, no clipping.
- Zero browser console errors across the whole run.

No layout shift observed in any screenshot; `prefers-reduced-motion` paths
were verified by code inspection (same guard function used everywhere) since
Playwright's `--force-prefers-reduced-motion` wasn't part of this pass — a
gap worth closing with a proper `run` skill later if this needs re-verifying.

## Related files

- `src/components/Header.astro`
- `src/components/navigation/DesktopNavigation.astro`
- `src/components/navigation/MobileNavigation.astro`
- `src/styles/global.css`
