# POCUS Faculty · Ponce Health Sciences University

Faculty information page for the hands-on point-of-care ultrasound (POCUS)
sessions for medical students. Built as a Next.js boilerplate on the **PHSU
Design System** (derived from the Visual Brand Guidelines at
branding.phsu.edu).

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- [HeroUI v2](https://www.heroui.com) + Tailwind CSS 3 + framer-motion
- `next-themes` for light/dark mode
- Open Sans · Noto Serif · Libre Baskerville · JetBrains Mono via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit things

| What | Where |
| --- | --- |
| Faculty names, bios, focus areas, emails | `src/data/faculty.ts` — **all entries are placeholders** |
| Faculty headshots | Drop images in `public/faculty/` and set `photo: "/faculty/<file>.jpg"` |
| Program name, contact email, nav links | `src/config/site.ts` |
| Active sub-brand (colour theme) | `src/config/theme.ts` — one constant |
| Session format, station list, FAQ copy | `src/components/sections/*.tsx` |
| Design tokens (colour ramps, AA pairings) | `src/phsu/tokens.js` |
| HeroUI theme generation | `src/phsu/heroui-themes.js` + `tailwind.config.js` |

## The PHSU theme system

All six sub-brands ship as HeroUI themes, light and dark each:
`phsu-core`, `phsu-medicine`, `phsu-nursing`, `phsu-dental`,
`phsu-behavioral`, `phsu-publichealth` (+ `-dark` variants). The page
currently runs **Medicine** — change `ACTIVE_SCHOOL` in
`src/config/theme.ts` to re-skin every component.

Semantic colour mapping (identical across themes):

| Token | Colour | Rule |
| --- | --- | --- |
| `primary` | Active school colour | DEFAULT is stepped to clear WCAG AA for button labels |
| `secondary` | Deep Teal `#024748` | The institutional anchor — same in every theme |
| `warning` | Signal Orange `#F7951D` | Foreground is ink `#0B2324`, **never white** |
| `danger` | Medicine red `#CD3915` | 5.01:1 with white — usable at brand value |
| `success` | Teal 600 | Success is teal, not green — green is not in the palette |
| `default` | Cool Gray ramp | Surfaces, dividers, disabled states |

Rules the design system asks you to keep:

- **Brand teal `#00999A` (primary-500 on core) is a non-text colour.** It
  clears 3:1 — fine for borders, icons, focus rings, large display type —
  but fails 4.5:1 for body copy and button labels. Use `color="primary"`
  (the AA-safe DEFAULT) or step to 600/700 for text.
- **Signal Orange is punctuation.** One accent per view, always with an ink
  label.
- **Three faces, three jobs.** Open Sans (`font-sans`) for headlines and
  all UI; Noto Serif (`font-serif` / `.subhead`) for ledes and editorial
  sub-heads; Libre Baskerville (`font-baskerville` / `.prose-phsu`) for
  body reading, never under 14px.
- Typography utilities `.display`, `.subhead`, `.prose-phsu`, `.eyebrow`
  are defined in `src/app/globals.css`.
