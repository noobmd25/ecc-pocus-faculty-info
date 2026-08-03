"use server";

import { getCourse, getModule, loadCourses, REGISTRY_PATH } from "@/data/modules";
import { isEditor } from "@/lib/role";
import { persistFile, persistModuleDoc } from "@/lib/edit";
import type { ModuleDoc } from "@/lib/content";
import {
  checklistTemplate,
  studentTemplate,
  teacherTemplate,
} from "@/lib/module-templates";
import path from "node:path";

const DOCS: ModuleDoc[] = ["student", "teacher", "checklist"];

export type SaveState = { ok: boolean; message: string } | null;

const PUBLISH_NOTE =
  "Saved and committed — the live site updates automatically in a minute or two.";

export async function saveModuleDoc(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  if (!(await isEditor())) {
    return { ok: false, message: "Your editor session expired. Sign in again with the editor password." };
  }

  const courseSlug = String(formData.get("course") ?? "");
  const moduleSlug = String(formData.get("module") ?? "");
  const doc = String(formData.get("doc") ?? "") as ModuleDoc;
  const content = String(formData.get("content") ?? "");

  if (!DOCS.includes(doc) || !(await getModule(courseSlug, moduleSlug))) {
    return { ok: false, message: "Unknown module or document." };
  }
  if (content.trim().length === 0) {
    return { ok: false, message: "The document is empty — nothing was saved." };
  }

  try {
    const { mode } = await persistModuleDoc(courseSlug, moduleSlug, doc, content);
    return {
      ok: true,
      message: mode === "github" ? PUBLISH_NOTE : "Saved.",
    };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Save failed." };
  }
}

export async function updateModuleDetails(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  if (!(await isEditor())) {
    return { ok: false, message: "Your editor session expired. Sign in again with the editor password." };
  }

  const courseSlug = String(formData.get("course") ?? "");
  const moduleSlug = String(formData.get("module") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim() || "60 min";

  if (!(await getModule(courseSlug, moduleSlug))) {
    return { ok: false, message: "Unknown module." };
  }
  if (title.length < 3) {
    return { ok: false, message: "Give the module a title." };
  }

  const courses = await loadCourses();
  const updated = courses.map((c) =>
    c.slug === courseSlug
      ? {
          ...c,
          modules: c.modules.map((m) =>
            m.slug === moduleSlug ? { ...m, title, description, time } : m,
          ),
        }
      : c,
  );

  try {
    const registryRelPath = path
      .relative(process.cwd(), REGISTRY_PATH)
      .split(path.sep)
      .join("/");
    const { mode } = await persistFile(
      registryRelPath,
      `${JSON.stringify({ courses: updated }, null, 2)}\n`,
    );
    return { ok: true, message: mode === "github" ? PUBLISH_NOTE : "Saved." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Save failed." };
  }
}

export type CreateState =
  | { ok: true; message: string; courseSlug: string; moduleSlug: string; live: boolean }
  | { ok: false; message: string }
  | null;

export async function createModule(
  _previous: CreateState,
  formData: FormData,
): Promise<CreateState> {
  if (!(await isEditor())) {
    return { ok: false, message: "Your editor session expired. Sign in again with the editor password." };
  }

  const courseSlug = String(formData.get("course") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const description = String(formData.get("description") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim() || "60 min";

  const course = await getCourse(courseSlug);
  if (!course) return { ok: false, message: "Unknown course." };
  if (title.length < 3) return { ok: false, message: "Give the module a title." };
  if (!/^[a-z0-9][a-z0-9-]{1,39}$/.test(slug) || slug === "new") {
    return { ok: false, message: "The URL slug must be 2–40 characters: lowercase letters, numbers and dashes." };
  }
  if (course.modules.some((m) => m.slug === slug)) {
    return { ok: false, message: `"${slug}" already exists in ${course.name}. Pick a different slug.` };
  }

  const number = course.modules.reduce((max, m) => Math.max(max, m.number), 0) + 1;

  // Updated registry: append the module and open the course if it was closed.
  const courses = await loadCourses();
  const updated = courses.map((c) =>
    c.slug === courseSlug
      ? {
          ...c,
          available: true,
          modules: [...c.modules, { slug, number, title, description, time }],
        }
      : c,
  );

  try {
    // Starter documents first, registry last — the module only becomes
    // visible once everything it links to exists.
    const docs: Array<[ModuleDoc, string]> = [
      ["student", studentTemplate(number, title, time)],
      ["teacher", teacherTemplate(number, title)],
      ["checklist", checklistTemplate()],
    ];
    let mode: "github" | "local" = "local";
    for (const [doc, content] of docs) {
      const result = await persistFile(
        `src/content/${courseSlug}/${slug}/${doc}.md`,
        content,
      );
      mode = result.mode;
    }
    const registryRelPath = path
      .relative(process.cwd(), REGISTRY_PATH)
      .split(path.sep)
      .join("/");
    await persistFile(registryRelPath, `${JSON.stringify({ courses: updated }, null, 2)}\n`);

    return {
      ok: true,
      courseSlug,
      moduleSlug: slug,
      live: mode === "local",
      message:
        mode === "github"
          ? `Module ${number} "${title}" created and committed — it appears on the live site after the automatic rebuild (a minute or two). Then open its pages and replace the placeholder text.`
          : `Module ${number} "${title}" created with starter pages.`,
    };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Creating the module failed." };
  }
}
