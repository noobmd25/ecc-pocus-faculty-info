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

## The password gate & the editor role

There are two passwords, entered on the same gate page:

- **Faculty password** (`ECC_POCUS_PASSWORD`, default in
  `src/lib/auth.ts`) — read access to `/modules`.
- **Editor password** (`ECC_POCUS_EDITOR_PASSWORD`, default in
  `src/lib/auth.ts` — **change it**) — everything above, plus editor
  mode: an "Edit" bar on every module page, a side-by-side
  markdown editor with live preview, and an "Add module" page for each
  course (`/editor/<course>/new`). Adding the first module to a closed
  course (ECC II–IV) opens it automatically.

Both are checked **server-side**; hashed `httpOnly` cookies unlock the
routes through middleware. This is shared-secret access for course
materials, not account-level security.

### Where edits go

- **Locally / self-hosted (no `GITHUB_TOKEN`)**: saves write the
  markdown files in place and are visible immediately.
- **Deployed (e.g., Vercel) with `GITHUB_TOKEN` set**: each save is
  committed to the GitHub repository (Contents API), which triggers the
  platform's automatic rebuild — edits go live in ~1–2 minutes, and
  every save is a revertable commit in the repo history.

To enable editing on a deployment, create a **fine-grained GitHub
personal access token** with *Contents: Read and write* on this
repository only, and set it as `GITHUB_TOKEN` in the host's environment
variables. Optional overrides: `GITHUB_REPO` (`owner/repo`) and
`GITHUB_BRANCH` (defaults to the deployed branch on Vercel). Without
the token, deployed saves fail with a clear error (the serverless
filesystem is read-only).

## Where to edit things

| What | Where |
| --- | --- |
| Module content (the actual documents) | In the browser via editor mode — or `src/content/<course>/<module>/{student,teacher,checklist}.md` |
| Course & module registry (titles, ordering, which courses are open) | `src/content/registry.json` (typed loaders in `src/data/modules.ts`) |
| Course name, contact email | `src/config/site.ts` |
| Passwords | `ECC_POCUS_PASSWORD` / `ECC_POCUS_EDITOR_PASSWORD` env vars (defaults in `src/lib/auth.ts`) |
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

To open **ECC II / III / IV** later: sign in with the editor password
and use its "add its first module" button — or edit
`src/content/registry.json` by hand.

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
