/**
 * One-time import of the file-based content (src/content) into Sanity.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... npm run sanity:migrate
 *
 * Reads the project id / dataset from the environment or .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID)
 *   NEXT_PUBLIC_SANITY_DATASET    (or SANITY_DATASET, default "production")
 *   SANITY_API_WRITE_TOKEN        (Editor token from sanity.io/manage → API → Tokens)
 *
 * Documents get deterministic ids (course-ecc-1, module-ecc-1-foundations…),
 * so re-running the script overwrites them instead of duplicating.
 */
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

// Minimal .env.local/.env loader so the script works without dotenv.
for (const file of [".env.local", ".env"]) {
  const envPath = path.join(process.cwd(), file);
  if (!existsSync(envPath)) continue;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || process.env[match[1]] !== undefined) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const projectId =
  process.env.SANITY_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  "8i37d72u";
const dataset =
  process.env.SANITY_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    [
      "Missing Sanity configuration. The script needs:",
      "  NEXT_PUBLIC_SANITY_PROJECT_ID  – from sanity.io/manage (also used by the site)",
      "  SANITY_API_WRITE_TOKEN         – an Editor token: sanity.io/manage → your project → API → Tokens",
      "Put them in .env.local or pass them inline:",
      "  SANITY_API_WRITE_TOKEN=sk... npm run sanity:migrate",
    ].join("\n"),
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-01",
  useCdn: false,
});

async function readDoc(courseSlug, moduleSlug, doc) {
  try {
    return await readFile(
      path.join("src", "content", courseSlug, moduleSlug, `${doc}.md`),
      "utf8",
    );
  } catch {
    return "";
  }
}

const registry = JSON.parse(
  await readFile(path.join("src", "content", "registry.json"), "utf8"),
);

const tx = client.transaction();
let courseCount = 0;
let moduleCount = 0;

for (const [index, course] of registry.courses.entries()) {
  tx.createOrReplace({
    _id: `course-${course.slug}`,
    _type: "course",
    name: course.name,
    fullName: course.fullName,
    slug: { _type: "slug", current: course.slug },
    available: course.available,
    order: index + 1,
  });
  courseCount += 1;

  for (const m of course.modules) {
    tx.createOrReplace({
      _id: `module-${course.slug}-${m.slug}`,
      _type: "module",
      title: m.title,
      slug: { _type: "slug", current: m.slug },
      course: { _type: "reference", _ref: `course-${course.slug}` },
      number: m.number,
      description: m.description,
      time: m.time,
      studentContent: await readDoc(course.slug, m.slug, "student"),
      teacherContent: await readDoc(course.slug, m.slug, "teacher"),
      checklistContent: await readDoc(course.slug, m.slug, "checklist"),
    });
    moduleCount += 1;
    console.log(`  queued module ${course.slug}/${m.slug}`);
  }
}

await tx.commit();
console.log(
  `Imported ${courseCount} courses and ${moduleCount} modules into ${projectId}/${dataset}.`,
);
console.log(
  "Set NEXT_PUBLIC_SANITY_PROJECT_ID in Vercel and redeploy — the site then reads from Sanity.",
);
