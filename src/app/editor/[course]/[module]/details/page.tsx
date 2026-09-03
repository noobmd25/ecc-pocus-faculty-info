import { notFound, redirect } from "next/navigation";
import { ModuleDetailsForm } from "@/components/module-details-form";
import { SiteHeader } from "@/components/site-header";
import { isEditor } from "@/lib/role";
import { getModule } from "@/data/modules";

export default async function ModuleDetailsPage({
  params,
}: {
  params: Promise<{ course: string; module: string }>;
}) {
  if (!(await isEditor())) redirect("/");

  const { course: courseSlug, module: moduleSlug } = await params;
  const found = await getModule(courseSlug, moduleSlug);
  if (!found) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader role="editor" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16">
        <div className="pt-8">
          <p className="eyebrow mb-2">
            Editing · {found.course.name} · Module {found.module.number}
          </p>
          <h1 className="font-sans text-2xl font-extrabold tracking-tight">
            Module details — {found.module.title}
          </h1>
          <p className="mt-2 max-w-[60ch] font-sans text-sm text-default-600">
            These fields appear on the module card in the index. The page
            content itself is edited from the module's pages.
          </p>
        </div>
        <div className="pt-6">
          <ModuleDetailsForm course={courseSlug} module={found.module} />
        </div>
      </main>
    </div>
  );
}
