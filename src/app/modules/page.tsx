import { Button, Card, CardBody, CardFooter, Chip, Divider } from "@heroui/react";
import Link from "next/link";
import { CourseSection } from "@/components/course-section";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { getRole } from "@/lib/role";
import { sanityEnabled, studioUrl } from "@/sanity/env";
import { loadCourses } from "@/data/modules";

export const metadata = {
  title: `Modules · ${siteConfig.courseShort} ${siteConfig.programShort}`,
};

export default async function ModulesPage() {
  const courses = await loadCourses();
  const role = await getRole();
  const editor = role === "editor";
  const learner = role === "learner";
  const openCourses = courses.filter((c) => c.available);
  const upcomingCourses = courses.filter((c) => !c.available);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader role={role} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-20">
        <div className="pt-12">
          <p className="eyebrow mb-3">Essentials of Clinical Care · POCUS</p>
          <h1 className="display text-3xl md:text-4xl">Session modules</h1>
          {learner ? (
            <p className="subhead mt-3 max-w-[62ch] font-normal leading-[1.6] text-foreground/85">
              Read the module for your upcoming session before you arrive.
              Each one takes about an hour, and the self-assessment at the
              end shows you what to review.
            </p>
          ) : (
            <p className="subhead mt-3 max-w-[62ch] font-normal leading-[1.6] text-foreground/85">
              Each module has a student version (the pre-session reading
              assigned to students) and a teacher version (facilitator notes
              plus the scanning-session checklist). Review both before your
              session.
            </p>
          )}
        </div>

        {openCourses.map((course) => (
          <CourseSection
            key={course.slug}
            name={course.name}
            fullName={course.fullName}
            action={
              editor && (!sanityEnabled || studioUrl) ? (
                sanityEnabled ? (
                  <Button
                    as="a"
                    href={`${studioUrl}/intent/create/template=module;type=module`}
                    target="_blank"
                    rel="noreferrer"
                    size="sm"
                    variant="bordered"
                    color="primary"
                    radius="sm"
                    className="font-sans font-semibold"
                  >
                    + Add module
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    href={`/editor/${course.slug}/new`}
                    size="sm"
                    variant="bordered"
                    color="primary"
                    radius="sm"
                    className="font-sans font-semibold"
                  >
                    + Add module
                  </Button>
                )
              ) : null
            }
          >
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {course.modules.map((module) => (
                <Card key={module.slug} shadow="sm" radius="lg">
                  <CardBody className="gap-2 px-5 pt-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary-800 font-sans text-sm font-extrabold text-white">
                        {module.number}
                      </span>
                      <h3 className="font-sans text-base font-bold leading-snug tracking-tight">
                        {module.title}
                      </h3>
                    </div>
                    <p className="font-baskerville text-sm leading-[1.7] text-foreground/90">
                      {module.description}
                    </p>
                    <p className="font-mono text-[11px] text-default-600">
                      {learner ? "About" : "Student prep:"} {module.time}
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter className="gap-2 px-5 py-4">
                    {learner ? (
                      <Button
                        as={Link}
                        href={`/modules/${course.slug}/${module.slug}/student`}
                        size="sm"
                        color="primary"
                        radius="sm"
                        className="font-sans font-semibold"
                      >
                        Open module
                      </Button>
                    ) : (
                      <>
                        <Button
                          as={Link}
                          href={`/modules/${course.slug}/${module.slug}/student`}
                          size="sm"
                          variant="bordered"
                          color="primary"
                          radius="sm"
                          className="font-sans font-semibold"
                        >
                          Student module
                        </Button>
                        <Button
                          as={Link}
                          href={`/modules/${course.slug}/${module.slug}/teacher`}
                          size="sm"
                          color="primary"
                          radius="sm"
                          className="font-sans font-semibold"
                        >
                          Teacher module + checklist
                        </Button>
                      </>
                    )}
                    {editor &&
                      (sanityEnabled ? (
                        studioUrl &&
                        module.id && (
                          <Button
                            as="a"
                            href={`${studioUrl}/intent/edit/id=${module.id};type=module`}
                            target="_blank"
                            rel="noreferrer"
                            size="sm"
                            variant="light"
                            color="primary"
                            radius="sm"
                            className="ml-auto font-sans font-semibold"
                          >
                            Edit
                          </Button>
                        )
                      ) : (
                        <Button
                          as={Link}
                          href={`/editor/${course.slug}/${module.slug}/details`}
                          size="sm"
                          variant="light"
                          color="primary"
                          radius="sm"
                          className="ml-auto font-sans font-semibold"
                        >
                          Details
                        </Button>
                      ))}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CourseSection>
        ))}

        {upcomingCourses.length > 0 && (
          <section className="mt-14">
            <h2 className="font-sans text-xl font-bold tracking-tight">
              Coming later in the curriculum
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {upcomingCourses.map((course) =>
                editor && (!sanityEnabled || studioUrl) ? (
                  sanityEnabled ? (
                    <Button
                      key={course.slug}
                      as="a"
                      href={`${studioUrl}/intent/create/template=module;type=module`}
                      target="_blank"
                      rel="noreferrer"
                      variant="flat"
                      radius="full"
                      className="font-sans font-semibold"
                    >
                      {course.name} — add its first module
                    </Button>
                  ) : (
                    <Button
                      key={course.slug}
                      as={Link}
                      href={`/editor/${course.slug}/new`}
                      variant="flat"
                      radius="full"
                      className="font-sans font-semibold"
                    >
                      {course.name} — add its first module
                    </Button>
                  )
                ) : (
                  <Chip
                    key={course.slug}
                    variant="flat"
                    size="lg"
                    className="font-sans font-semibold"
                  >
                    {course.name} — in development
                  </Chip>
                ),
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-divider">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-6">
          <p className="font-sans text-xs text-default-600">
            {siteConfig.courseName} · {siteConfig.school} ·{" "}
            {siteConfig.university}
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-sans text-xs font-semibold text-primary"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </footer>
    </div>
  );
}
