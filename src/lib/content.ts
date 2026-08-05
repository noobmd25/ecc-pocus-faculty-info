import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSanityClient } from "@/sanity/client";
import { sanityEnabled } from "@/sanity/env";
import { moduleDocsQuery } from "@/sanity/queries";

export type ModuleDoc = "student" | "teacher" | "checklist";

/**
 * Reads a module's markdown document — from Sanity when connected
 * (published content, ≤30 s stale), otherwise from src/content.
 * Returns null if absent or empty.
 */
export async function readModuleDoc(
  courseSlug: string,
  moduleSlug: string,
  doc: ModuleDoc,
): Promise<string | null> {
  if (sanityEnabled) {
    const docs = await getSanityClient().fetch<Record<
      ModuleDoc,
      string | null
    > | null>(
      moduleDocsQuery,
      { courseSlug, moduleSlug },
      { next: { revalidate: 30 } },
    );
    const text = docs?.[doc];
    return text && text.trim().length > 0 ? text : null;
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    courseSlug,
    moduleSlug,
    `${doc}.md`,
  );
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}
