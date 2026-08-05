import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSanityClient } from "@/sanity/client";
import { sanityEnabled } from "@/sanity/env";
import { coursesQuery } from "@/sanity/queries";

/**
 * Course and module registry.
 *
 * Content comes from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID is set
 * (editing happens in the standalone Studio). Without it, the data lives
 * in src/content/registry.json with markdown documents alongside it —
 * the original git-backed setup, still used as the fallback.
 */

export type ModuleDef = {
  /** URL segment (and content folder name in the file-based fallback) */
  slug: string;
  number: number;
  title: string;
  description: string;
  /** Estimated student completion time */
  time: string;
  /** Sanity document id — only present when content comes from Sanity */
  id?: string;
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
  if (sanityEnabled) {
    return getSanityClient().fetch<CourseDef[]>(
      coursesQuery,
      {},
      { next: { revalidate: 30 } },
    );
  }
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
