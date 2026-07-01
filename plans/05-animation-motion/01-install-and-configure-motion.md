---
task: 01-install-and-configure-motion
plan: 05-animation-motion
status: done
---

# Task: Install and configure Motion

## Goal

Add the `motion` package and establish the pattern for using it inside Astro
components (plain `<script>` + `client:*` directive, no framework needed).

## Steps

- [x] `pnpm add motion`
- [x] Confirm current Motion docs (motion.dev) for the vanilla/mini bundle
      import path — resolved differently than assumed: `motion/mini` only
      exports a trimmed `animate()` (no `inView`, no scroll utilities), but
      [Task 03](03-animate-hero-and-section-reveals.md) needs `inView` for
      scroll-triggered reveals. Splitting `animate`-only calls onto
      `motion/mini` and `inView`-needing calls onto the full `motion` package
      would mean shipping both bundles. Used plain `"motion"` everywhere
      instead — it's the vanilla DOM API either way (no React), so the
      "avoid unnecessary JS" goal is already met; `motion/mini` would only
      have mattered if the site *only* needed simple one-off animations
- [x] Establish one reference pattern — implemented directly in
      `Header.astro`'s existing `<script>` (theme icon crossfade + mobile
      menu animation) rather than a separate throwaway demo component, since
      real, already-shipping code makes a more useful reference than a
      sample nobody imports. The pattern is documented via a comment at the
      top of that script.
- [x] Document the pattern (comment or short note in the component) so
      Tasks 02–03 follow it consistently — see the comment in
      `Header.astro`'s `<script>` and its restatement in
      `ScrollReveal.astro`'s comment

## Verified

`pnpm build` succeeds. All reduced-motion paths checked directly with a
real headless-browser run (not just code review) — see
[Task 02](02-animate-navigation-and-theme-toggle.md) and
[Task 03](03-animate-hero-and-section-reveals.md) for the specific
verification results.

## Related files

- `package.json`
- `src/components/Header.astro` (reference pattern — theme icon crossfade + mobile menu)
- `src/components/ScrollReveal.astro` (reference pattern — shared scroll-reveal for section components)
