---
task: 02-animate-navigation-and-theme-toggle
plan: 05-animation-motion
status: planned
---

# Task: Animate navigation and theme toggle

## Goal

Add subtle motion to the mobile menu open/close (`MobileNavigation.astro` +
the `openMenu`/`closeMenu` functions in `Header.astro`) and the theme-toggle
icon swap, replacing the current instant `hidden`/`classList.toggle` swaps
with animated transitions.

## Steps

- [ ] Mobile menu: animate height/opacity on open/close instead of the
      current `mobileMenu.hidden = true/false` instant toggle
      (`Header.astro` `openMenu`/`closeMenu`)
- [ ] Theme icon swap: animate the moon/sun icon crossfade instead of the
      current `classList.toggle("hidden", ...)` instant swap
      (`syncThemeButtons` in `Header.astro`)
- [ ] Keep the existing View Transitions theme-splash effect untouched —
      this task only touches the icon-swap inside the toggle button, not the
      page-level theme transition
- [ ] All animations must no-op or reduce to instant under
      `prefers-reduced-motion: reduce` (same guard pattern as `setTheme`)

## Acceptance criteria

- Menu open/close and icon swap are visibly animated with Motion
- No layout shift or flash introduced
- `prefers-reduced-motion: reduce` disables the new animations

## Related files

- `src/components/Header.astro`
- `src/components/navigation/MobileNavigation.astro`
