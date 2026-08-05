import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownDoc } from "@/components/markdown-doc";
import { SiteHeader } from "@/components/site-header";
import { readModuleDoc } from "@/lib/content";
import { isEditor } from "@/lib/role";
import { sanityEnabled, studioUrl } from "@/sanity/env";
import { getModule } from "@/data/modules";

const AUDIENCES = ["student", "teacher"] as const;
type Audience = (typeof AUDIENCES)[number];

type Params = { course: string; module: string; audience: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { course, module: moduleSlug, audience } = await params;
  const found = await getModule(course, moduleSlug);
  if (!found) return {};
  const label = audience === "teacher" ? "Teacher" : "Student";
  return {
    title: `${found.module.title} · ${label} · ${found.course.name}`,
  };
}

export default async function ModuleDocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { course: courseSlug, module: moduleSlug, audience } = await params;

  if (!AUDIENCES.includes(audience as Audience)) notFound();
  const found = await getModule(courseSlug, moduleSlug);
  if (!found) notFound();
  const { course, module } = found;

  const doc = await readModuleDoc(courseSlug, moduleSlug, audience as Audience);
  if (!doc) notFound();

  const checklist =
    audience === "teacher"
      ? await readModuleDoc(courseSlug, moduleSlug, "checklist")
      : null;

  const editor = await isEditor();
  const counterpart: Audience = audience === "teacher" ? "student" : "teacher";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader editor={editor} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20">
        <nav className="flex flex-wrap items-center gap-3 pt-8 font-sans text-sm">
          <Link href="/modules" className="font-semibold text-primary">
            ← All modules
          </Link>
          <span className="text-default-600">
            {course.name} · Module {module.number}
          </span>
          <span className="flex-1" />
          <Chip
            size="sm"
            variant="flat"
            color={audience === "teacher" ? "secondary" : "primary"}
            className="font-sans font-semibold"
          >
            {audience === "teacher"
              ? "Teacher module — instructors only"
              : "Student module"}
          </Chip>
        </nav>

        {editor && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[12px] border border-warning-200 bg-warning-50 px-4 py-3">
            <span className="font-sans text-sm font-semibold">Editor mode:</span>
            {sanityEnabled ? (
              <>
                {studioUrl && module.id ? (
                  <Button
                    as="a"
                    href={`${studioUrl}/intent/edit/id=${module.id};type=module`}
                    target="_blank"
                    rel="noreferrer"
                    size="sm"
                    color="primary"
                    radius="sm"
                    className="font-sans font-semibold"
                  >
                    Edit in Studio
                  </Button>
                ) : (
                  <span className="font-sans text-xs text-foreground/70">
                    Content is managed in Sanity Studio
                    {!studioUrl &&
                      " — set NEXT_PUBLIC_SANITY_STUDIO_URL to enable direct edit links"}
                    .
                  </span>
                )}
                {studioUrl && module.id && (
                  <span className="font-sans text-xs text-foreground/70">
                    Student page, teacher notes, checklist and card details all
                    live in one Studio document.
                  </span>
                )}
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  href={`/editor/${courseSlug}/${moduleSlug}/${audience}`}
                  size="sm"
                  color="primary"
                  radius="sm"
                  className="font-sans font-semibold"
                >
                  {audience === "teacher"
                    ? "Edit teaching notes"
                    : "Edit this page"}
                </Button>
                {audience === "teacher" && (
                  <Button
                    as={Link}
                    href={`/editor/${courseSlug}/${moduleSlug}/checklist`}
                    size="sm"
                    variant="bordered"
                    color="primary"
                    radius="sm"
                    className="font-sans font-semibold"
                  >
                    Edit checklist
                  </Button>
                )}
                <Button
                  as={Link}
                  href={`/editor/${courseSlug}/${moduleSlug}/details`}
                  size="sm"
                  variant="light"
                  color="primary"
                  radius="sm"
                  className="font-sans font-semibold"
                >
                  Edit details
                </Button>
              </>
            )}
          </div>
        )}

        <article className="pt-8">
          <MarkdownDoc>{doc}</MarkdownDoc>

          {checklist && (
            <div className="mt-14 rounded-[14px] border border-divider bg-content2 p-6 sm:p-8">
              <MarkdownDoc>{checklist}</MarkdownDoc>
              <p className="mt-6 font-sans text-xs text-default-600">
                Tip: print this checklist page (or this section) for the
                session — one sheet per group of eight.
              </p>
            </div>
          )}
        </article>

        <div className="mt-14 flex flex-wrap gap-3 border-t border-divider pt-8">
          <Button
            as={Link}
            href={`/modules/${courseSlug}/${moduleSlug}/${counterpart}`}
            variant="bordered"
            color="primary"
            radius="md"
            className="font-sans font-semibold"
          >
            {counterpart === "teacher"
              ? "View the teacher module"
              : "View the student module"}
          </Button>
          <Button
            as={Link}
            href="/modules"
            variant="light"
            color="primary"
            radius="md"
            className="font-sans font-semibold"
          >
            Back to all modules
          </Button>
        </div>
      </main>
    </div>
  );
}
