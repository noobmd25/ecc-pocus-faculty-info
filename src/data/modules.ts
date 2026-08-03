import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Course and module registry.
 *
 * The data lives in src/content/registry.json so the in-browser editor
 * can add modules without a code change. Content documents live in
 * src/content/<course>/<module>/{student,teacher,checklist}.md.
 */

export type ModuleDef = {
  /** URL segment and content folder name */
  slug: string;
  number: number;
  title: string;
  description: string;
  /** Estimated student completion time */
  time: string;
};

export type CourseDef = {
  /** URL segment and content folder name */
  slug: string;
  name: string;
  fullName: string;
  available: boolean;
  modules: ModuleDef[];
};

export const REGISTRY_PATH = path.join(
  process.cwd(),
  "src",
  "content",
  "registry.json",
);

export async function loadCourses(): Promise<CourseDef[]> {
  const raw = await readFile(REGISTRY_PATH, "utf8");
  return (JSON.parse(raw) as { courses: CourseDef[] }).courses;
}

export async function getCourse(
  courseSlug: string,
): Promise<CourseDef | undefined> {
  const courses = await loadCourses();
  return courses.find((c) => c.slug === courseSlug);
}

export async function getModule(
  courseSlug: string,
  moduleSlug: string,
): Promise<{ course: CourseDef; module: ModuleDef } | undefined> {
  const course = await getCourse(courseSlug);
  const module = course?.modules.find((m) => m.slug === moduleSlug);
  return course && module ? { course, module } : undefined;
}
