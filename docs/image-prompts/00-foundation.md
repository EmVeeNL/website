# Foundation — style block, negative prompt, logo rules

Append both blocks below to every scene description in this folder.

## Master style block

```text
EMVEE visual language: modern minimalist geometry inspired by the existing angular interlocking E/V monogram, sharp diagonal cuts, precise modular lines, one small square-dot accent, calm premium digital craftsmanship, generous negative space, deep navy #111B34, action blue #0266E3, sky blue #0A9DE3, cyan #05DAFD, white #FFFFFF and soft off-white #F7FAFD, controlled cyan-to-blue gradient, clean balanced composition, subtle depth, high-end European technology brand, quiet confidence, human-centred, timeless, no text, do not redraw or alter the logo.
```

## Negative prompt

```text
Avoid: purple, magenta, red-dominant palettes, cyberpunk, gamer aesthetics, neon overload, glossy futuristic clichés, generic SaaS blobs, random 3D spheres, busy gradients, visual clutter, fake interface text, illegible typography, stock-photo handshakes, exaggerated smiles, suits around a conference table, hard lens flares, chrome, glassmorphism overload, cartoon mascots, childish illustration, distorted hands, watermarks, signatures, extra logos.
```

## Variant blocks

Use these instead of (not in addition to) the master style block when the image is specifically for one theme or a transparent asset.

**Dark mode:**
```text
Design for a deep navy #111B34 background. Use white and soft off-white for light elements, a controlled gradient from #05DAFD through #0A9DE3 to #0266E3, subtle surface separation, restrained glow only where needed, no black void, no neon cyberpunk, no text, no generated logo.
```

**Light mode:**
```text
Design for a clean white or #F7FAFD background. Use #111B34 for strong structure, #0266E3 as the primary action accent, #0A9DE3 and #05DAFD as controlled secondary details, crisp geometric edges, soft shadows, generous negative space, no text, no generated logo.
```

**Transparent asset:**
```text
Create an isolated brand asset on a fully transparent background, clean edges, no shadow outside the object, centred with generous transparent padding, angular EMVEE geometry, navy-to-cyan palette, no text, no logo recreation, high resolution PNG style.
```

**Photography (real people):**
```text
Premium natural editorial photography for EMVEE, calm and personal rather than corporate stock photography, soft directional daylight, authentic materials, realistic skin and texture, restrained contrast, generous negative space, subtle geometric reflections or light accents inspired by the angular E/V monogram, palette accents in #111B34, #0266E3, #0A9DE3 and #05DAFD, high-end European digital studio, trustworthy and human, no visible brand names, no generated text.
```

## Logo integration

Never let an image generator redraw the EMVEE logo.

1. Generate the image without a logo.
2. Reserve a calm, empty zone in the composition.
3. Place the real logo file (`src/assets/images/logo-dark.png` / `logo-light.png`) afterwards in design software.
4. Never distort, recolor, or tilt the logo.

## Typography

Chocopie is the brand font. Prefer adding real headline text in code/CSS over generating text in the image. If a mockup genuinely needs placeholder text, prompt for "clean placeholder lines only, no readable generated text."

## Core palette reference

| Token | Hex | Role |
|---|---|---|
| Deep navy | `#111B34` | Primary structure / dark background |
| Action blue | `#0266E3` | Primary action accent |
| Sky blue | `#0A9DE3` | Secondary/brand accent |
| Cyan | `#05DAFD` | Dark-mode primary accent |
| White | `#FFFFFF` | Light background |
| Soft off-white | `#F7FAFD` | Soft light surface |

These are the same hex values the OKLCH tokens in `src/styles/global.css` are built from — see [`../STYLEGUIDE.md`](../STYLEGUIDE.md).
