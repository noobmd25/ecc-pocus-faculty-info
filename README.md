# ECC POCUS Modules · Ponce Health Sciences University

Faculty site for the hands-on point-of-care ultrasound (POCUS) sessions in
the **Essentials of Clinical Care (ECC)** course — the med-student course
that integrates physical exam, history taking and POCUS skills.

The site is intentionally simple:

1. **`/` — password gate.** Faculty enter the shared access password.
2. **`/modules` — module library.** The teacher modules (facilitator
   guides) and the student modules (pre-session reading), for faculty to
   review before each session.

Built on the **PHSU Design System** (derived from the Visual Brand
Guidelines at branding.phsu.edu).

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- [HeroUI v2](https://www.heroui.com) (2.7.11 — last Tailwind 3-compatible
  release) + Tailwind CSS 3 + framer-motion
- `next-themes` for light/dark mode
- Open Sans · Noto Serif · Libre Baskerville · JetBrains Mono via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The password gate

- The password is checked **server-side** (a server action) and a hashed,
  `httpOnly` cookie unlocks `/modules` through middleware — the password
  never ships in the client bundle.
- Change it by setting the `ECC_POCUS_PASSWORD` environment variable in
  your host (Vercel → Project Settings → Environment Variables). The
  fallback default lives in `src/lib/auth.ts`.
- This is a shared secret for course materials, not account-level
  security. Anyone with the password (or repo access) can read the
  modules. Don't put anything sensitive behind it.

## Where to edit things

| What | Where |
| --- | --- |
| Module content (the actual documents) | `src/content/<course>/<module>/{student,teacher,checklist}.md` — plain Markdown |
| Course & module registry (titles, ordering, which courses are open) | `src/data/modules.ts` |
| Course name, contact email | `src/config/site.ts` |
| Access password | `ECC_POCUS_PASSWORD` env var (default in `src/lib/auth.ts`) |
| Active sub-brand (colour theme) | `src/config/theme.ts` — one constant |
| Design tokens (colour ramps, AA pairings) | `src/phsu/tokens.js` |
| HeroUI theme generation | `src/phsu/heroui-themes.js` + `tailwind.config.js` |

### Content model

Each module renders at `/modules/<course>/<module>/student` and
`/modules/<course>/<module>/teacher`:

- **student** page = `student.md` (the pre-session packet).
- **teacher** page = `teacher.md` (facilitator notes) with `checklist.md`
  (the scanning-session checklist) appended in a highlighted panel.

Markdown conventions used by the renderer: `##` sections, `###`
subheads (rendered in the serif face), GFM tables for checklists, and a
trailing `\` for hard line breaks (used in self-assessment options).

To open **ECC II / III / IV** later: flip `available: true` in
`src/data/modules.ts`, add the module entries, and create the matching
folders under `src/content/`.

## The PHSU theme system

All six sub-brands ship as HeroUI themes, light and dark each:
`phsu-core`, `phsu-medicine`, `phsu-nursing`, `phsu-dental`,
`phsu-behavioral`, `phsu-publichealth` (+ `-dark` variants). The site
currently runs **Medicine** — change `ACTIVE_SCHOOL` in
`src/config/theme.ts` to re-skin everything.

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

- **Brand teal `#00999A` (primary-500 on core) is a non-text colour.**
  Use `color="primary"` (the AA-safe DEFAULT) or step to 600/700 for text.
- **Signal Orange is punctuation.** One accent per view, always with an
  ink label.
- **Three faces, three jobs.** Open Sans (`font-sans`) for headlines and
  all UI; Noto Serif (`font-serif` / `.subhead`) for ledes; Libre
  Baskerville (`font-baskerville` / `.prose-phsu`) for body reading,
  never under 14px.
- Typography utilities `.display`, `.subhead`, `.prose-phsu`, `.eyebrow`
  are defined in `src/app/globals.css`.

> The earlier design-system demo page (hero, faculty grid, sessions, FAQ)
> was removed in favour of this simpler flow; it lives in git history at
> the first commit if you ever want pieces of it back.
