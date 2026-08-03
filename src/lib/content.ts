import { readFile } from "node:fs/promises";
import path from "node:path";

export type ModuleDoc = "student" | "teacher" | "checklist";

/** Reads a module's markdown document from src/content. Returns null if absent. */
export async function readModuleDoc(
  courseSlug: string,
  moduleSlug: string,
  doc: ModuleDoc,
): Promise<string | null> {
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
