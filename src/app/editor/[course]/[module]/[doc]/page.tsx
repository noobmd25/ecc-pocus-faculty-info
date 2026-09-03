import { notFound, redirect } from "next/navigation";
import { EditorForm } from "@/components/editor-form";
import { SiteHeader } from "@/components/site-header";
import { readModuleDoc, type ModuleDoc } from "@/lib/content";
import { isEditor } from "@/lib/role";
import { getModule } from "@/data/modules";

const DOCS: ModuleDoc[] = ["student", "teacher", "checklist"];

const DOC_LABEL: Record<ModuleDoc, string> = {
  student: "Student module",
  teacher: "Faculty teaching notes",
  checklist: "Scanning-session checklist",
};

export default async function EditDocPage({
  params,
}: {
  params: Promise<{ course: string; module: string; doc: string }>;
}) {
  if (!(await isEditor())) redirect("/");

  const { course: courseSlug, module: moduleSlug, doc } = await params;
  if (!DOCS.includes(doc as ModuleDoc)) notFound();

  const found = await getModule(courseSlug, moduleSlug);
  if (!found) notFound();

  const content = await readModuleDoc(courseSlug, moduleSlug, doc as ModuleDoc);
  if (content === null) notFound();

  const backHref = `/modules/${courseSlug}/${moduleSlug}/${doc === "student" ? "student" : "teacher"}`;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader role="editor" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16">
        <div className="pt-8">
          <p className="eyebrow mb-2">
            Editing · {found.course.name} · Module {found.module.number}
          </p>
          <h1 className="font-sans text-2xl font-extrabold tracking-tight">
            {DOC_LABEL[doc as ModuleDoc]} — {found.module.title}
          </h1>
        </div>
        <div className="pt-6">
          <EditorForm
            course={courseSlug}
            module={moduleSlug}
            doc={doc}
            initialContent={content}
            backHref={backHref}
          />
        </div>
      </main>
    </div>
  );
}
