import { notFound, redirect } from "next/navigation";
import { NewModuleForm } from "@/components/new-module-form";
import { SiteHeader } from "@/components/site-header";
import { isEditor } from "@/lib/role";
import { getCourse } from "@/data/modules";

export default async function NewModulePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  if (!(await isEditor())) redirect("/");

  const { course: courseSlug } = await params;
  const course = await getCourse(courseSlug);
  if (!course) notFound();

  const nextNumber =
    course.modules.reduce((max, m) => Math.max(max, m.number), 0) + 1;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader editor />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16">
        <div className="pt-8">
          <p className="eyebrow mb-2">
            {course.name} · {course.fullName}
          </p>
          <h1 className="font-sans text-2xl font-extrabold tracking-tight">
            Add a module to {course.name}
          </h1>
          {!course.available && (
            <p className="mt-2 max-w-[60ch] font-sans text-sm text-default-600">
              {course.name} is not open yet — adding its first module opens it
              on the modules page.
            </p>
          )}
        </div>
        <div className="pt-6">
          <NewModuleForm course={courseSlug} nextNumber={nextNumber} />
        </div>
      </main>
    </div>
  );
}
