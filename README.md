# ECC POCUS Modules · Ponce Health Sciences University

Module site for the hands-on point-of-care ultrasound (POCUS) sessions in
the **Essentials of Clinical Care (ECC)** course — the med-student course
that integrates physical exam, history taking and POCUS skills.

The site is intentionally simple:

1. **`/` — password gate.** One page, three passwords: students, faculty
   and editors each get the view their password unlocks.
2. **`/modules` — module library.** The student modules (pre-session
   reading) and, for faculty, the teacher modules (facilitator guides
   plus the scanning-session checklist).

Built on the **PHSU Design System** (derived from the Visual Brand
Guidelines at branding.phsu.edu).

This repo holds two applications, side by side (the layout Sanity
recommends):

```
.                              # Next.js site (this folder)
└── studio-ecc-pocus-faculty-info/   # standalone Sanity Studio
```

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- [HeroUI v2](https://www.heroui.com) (2.7.11 — last Tailwind 3-compatible
  release) + Tailwind CSS 3 + framer-motion
- [Sanity](https://www.sanity.io) as the CMS (`next-sanity` client in the
  site; standalone Studio in `studio-ecc-pocus-faculty-info/`)
- `next-themes` for light/dark mode
- Open Sans · Noto Serif · Libre Baskerville · JetBrains Mono via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The password gate & the three roles

Three passwords, entered on the same gate page, unlock three roles:

- **Student password** (`ECC_POCUS_LEARNER_PASSWORD` — **no default**;
  student sign-in stays off until it is set) — the student modules only.
  Students see the module index with a single "Open module" button per
  module, never the teacher page or the checklist; a teacher URL quietly
  opens the student version. Sessions last ~120 days (a semester);
  changing the password signs everyone out, so rotate it per cohort.
- **Faculty password** (`ECC_POCUS_PASSWORD`, default in
  `src/lib/auth.ts`) — student and teacher modules. Sessions last
  ~180 days.
- **Editor password** (`ECC_POCUS_EDITOR_PASSWORD`, default in
  `src/lib/auth.ts` — **change it**) — everything above, plus editor
  mode: "Edit in Studio" links (or, without Sanity, the built-in
  markdown editor and "Add module" pages).

All three are checked **server-side**; hashed `httpOnly` cookies unlock
the routes through middleware, which also knows the difference between a
student and a faculty cookie. A visitor who lands on a module link
before signing in (e.g. from Canvas) is sent back to that page after
the gate. This is shared-secret access for course materials, not
account-level security: a shared password cannot identify individual
students, so there is no per-student tracking — keep quizzes and grades
in Canvas.

## Content: Sanity

Content lives in Sanity project **`8i37d72u`**, dataset `production`.
The site reads **published** documents through the CDN with a 30-second
revalidation window — publishing in the Studio is live on the site in
well under a minute, no rebuild involved.

The dataset is **private**: reads require `SANITY_API_READ_TOKEN` (a
Viewer token). That keeps the teacher notes behind the same wall as the
faculty password gate — a public dataset would be readable by anyone who
knows the project id, which is baked into the client bundle as a
`NEXT_PUBLIC_` variable. The token is server-only, and
`src/sanity/client.ts` imports `server-only` so that importing it from a
client component is a build error rather than a silent leak.

The content model (defined in
`studio-ecc-pocus-faculty-info/schemaTypes/`):

- **course** — ECC I–IV: name, full name, slug, `available` switch,
  sort order.
- **module** — reference to its course + slug, number, card description,
  prep time, and three markdown fields: `studentContent`,
  `teacherContent`, `checklistContent`.

### Switching the site to Sanity (one-time — already done locally)

The import has been run: 4 courses and 5 ECC I modules, with all 15
markdown documents, are in `8i37d72u/production`. What remains is the
Vercel side. For reference, the full sequence is:

1. **Install both apps** — `npm install` here and in
   `studio-ecc-pocus-faculty-info/`.
2. **Import the existing content** — `npm run sanity:migrate` with
   `SANITY_API_WRITE_TOKEN` set (an Editor token from sanity.io/manage →
   API → Tokens). Re-running is safe: documents have stable ids and are
   overwritten, not duplicated. Delete the Editor token afterwards — the
   running site only ever needs the Viewer token.
3. **Make the dataset private** — `npx sanity datasets visibility set
   production private`. Needs an **Administrator** login; an Editor token
   is not enough for this call.
4. **Point the site at Sanity** — set `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_API_READ_TOKEN` in Vercel and
   redeploy.
5. **Deploy the Studio** — `npm run deploy` in the studio folder, then set
   `NEXT_PUBLIC_SANITY_STUDIO_URL` to its URL so editor mode gets its
   "Edit in Studio" buttons. The deploy also registers the schema, so a
   separate `npx sanity schemas deploy` is not needed.

The Studio is live at **https://ecc-pocus-faculty-info.sanity.studio**
(app id pinned in `studio-ecc-pocus-faculty-info/sanity.cli.ts`, so
redeploys never prompt). Faculty who need to edit must be **invited as
project members** in sanity.io/manage — the editor password on this site
does not grant Studio access; it only reveals the links.

No CORS configuration is needed. The site queries Sanity only from
server components, so the browser never talks to the API, and Sanity
already allows its own Studio origins.

Until step 4, the site keeps serving the markdown in `src/content` —
nothing breaks mid-migration. Upgrade path if you ever want real-time
updates and click-to-edit previews: `defineLive` + Visual Editing from
`next-sanity` (see `.agents/skills/sanity-best-practices`).

### Vercel environment variables

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `8i37d72u` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | the Viewer token — **not** `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | the deployed Studio URL (after step 5) |
| `ECC_POCUS_PASSWORD` / `ECC_POCUS_EDITOR_PASSWORD` | the faculty and editor gate passwords |
| `ECC_POCUS_LEARNER_PASSWORD` | the student password — required for student sign-in |

`GITHUB_TOKEN` is no longer used once Sanity is connected and can be
removed.

### Legacy fallback: the git-backed editor

When `NEXT_PUBLIC_SANITY_PROJECT_ID` **is** set, the `/editor/...` routes
redirect to the Studio and their server actions refuse to run. That is
deliberate: those actions write `src/content/*.md` and `registry.json`,
which nothing reads any more in Sanity mode — and `updateModuleDetails`
would have written Sanity-shaped records (complete with `_id` fields)
back into `registry.json`.

When the project id is **not** set, the original in-browser editor at
`/editor/...` still works:

- **Locally / self-hosted (no `GITHUB_TOKEN`)**: saves write the
  markdown files in place and are visible immediately.
- **Deployed with `GITHUB_TOKEN` set** (fine-grained PAT, *Contents:
  Read and write* on this repo): each save is committed via the GitHub
  Contents API and the platform rebuild publishes it in ~1–2 minutes.
  Optional overrides: `GITHUB_REPO`, `GITHUB_BRANCH`.

## Where to edit things

| What | Where |
| --- | --- |
| Module content (the actual documents) | Sanity Studio (`studio-ecc-pocus-faculty-info/`, or the deployed Studio URL) — fallback: `src/content/<course>/<module>/{student,teacher,checklist}.md` |
| Course & module registry (titles, ordering, which courses are open) | `course` documents in the Studio — fallback: `src/content/registry.json` (typed loaders in `src/data/modules.ts`) |
| Content schema (fields, validation) | `studio-ecc-pocus-faculty-info/schemaTypes/` |
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
