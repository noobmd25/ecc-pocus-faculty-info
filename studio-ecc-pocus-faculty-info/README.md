# ECC POCUS — Sanity Studio

Standalone [Sanity Studio](https://www.sanity.io/docs/studio) for the ECC
POCUS faculty module library (project `8i37d72u`, dataset `production`).
It lives beside the Next.js app in this repo but is its own application —
the site only talks to Sanity's APIs, never to this folder.

## Content model

- **Course** — ECC I–IV: short name, full name, URL slug, "available"
  switch, sort order.
- **Module** — belongs to a course: title, slug, number, card description,
  prep time, and three markdown documents (student module, teacher module,
  scanning-session checklist).

## Run it locally

Requires Node.js 22.12+.

```bash
cd studio-ecc-pocus-faculty-info
npm install
npm run dev        # Studio at http://localhost:3333
```

Sign in with a Sanity account that is a member of the project.

## One-time project setup

1. **Deploy the schema** (lets AI/MCP tooling and some Studio features see
   the content model):
   ```bash
   npx sanity schemas deploy
   ```
2. **CORS**: allow the site's origins (with credentials) so the deployed
   Studio and the site can call the API:
   ```bash
   npx sanity cors add http://localhost:3000 --credentials
   npx sanity cors add https://<your-vercel-domain> --credentials
   ```
3. **Import the existing modules** — from the app folder:
   ```bash
   cd .. && SANITY_API_WRITE_TOKEN=sk... npm run sanity:migrate
   ```
   (Create an Editor token at sanity.io/manage → API → Tokens.)

## Deploy the Studio

```bash
npm run deploy     # hosts it at https://<hostname>.sanity.studio
```

Then set `NEXT_PUBLIC_SANITY_STUDIO_URL` in the app (Vercel env) to that
URL so the site's editor-mode buttons deep-link into the Studio.
