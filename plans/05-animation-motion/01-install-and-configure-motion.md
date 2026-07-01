---
task: 01-install-and-configure-motion
plan: 05-animation-motion
status: planned
---

# Task: Install and configure Motion

## Goal

Add the `motion` package and establish the pattern for using it inside Astro
components (plain `<script>` + `client:*` directive, no framework needed).

## Steps

- [ ] `pnpm add motion`
- [ ] Confirm current Motion docs (motion.dev) for the vanilla/mini bundle
      import path — use the smallest applicable entry point (e.g.
      `motion/mini` if only simple animations are needed) to avoid shipping
      unnecessary JS on a static site
- [ ] Establish one reference pattern: a small Astro component with an
      inline `<script>` that imports `animate` from `motion` and animates a
      `data-animate` element, gated behind
      `window.matchMedia("(prefers-reduced-motion: reduce)")` — matching the
      existing reduced-motion handling style in `Header.astro`
- [ ] Document the pattern (comment or short note in the component) so
      Tasks 02–03 follow it consistently

## Acceptance criteria

- `pnpm build` succeeds with the new dependency
- Reference pattern respects `prefers-reduced-motion`

## Related files

- `package.json`
- `src/components/Header.astro` (existing reduced-motion handling reference)
