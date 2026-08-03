import { Button, Card, CardBody, CardFooter, Chip, Divider } from "@heroui/react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { courses } from "@/data/modules";

export const metadata = {
  title: `Modules · ${siteConfig.courseShort} ${siteConfig.programShort}`,
};

export default function ModulesPage() {
  const openCourses = courses.filter((c) => c.available);
  const upcomingCourses = courses.filter((c) => !c.available);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-20">
        <div className="pt-12">
          <p className="eyebrow mb-3">Essentials of Clinical Care · POCUS</p>
          <h1 className="display text-3xl md:text-4xl">Session modules</h1>
          <p className="subhead mt-3 max-w-[62ch] font-normal leading-[1.6] text-foreground/85">
            Each module has a student version (the pre-session reading assigned
            to students) and a teacher version (facilitator notes plus the
            scanning-session checklist). Review both before your session.
          </p>
        </div>

        {openCourses.map((course) => (
          <section key={course.slug} className="mt-12">
            <div className="flex items-baseline gap-3">
              <h2 className="font-sans text-xl font-bold tracking-tight">
                {course.name}
              </h2>
              <span className="font-sans text-sm text-default-600">
                {course.fullName}
              </span>
            </div>
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
                      Student prep: {module.time}
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter className="gap-2 px-5 py-4">
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
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {upcomingCourses.length > 0 && (
          <section className="mt-14">
            <h2 className="font-sans text-xl font-bold tracking-tight">
              Coming later in the curriculum
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {upcomingCourses.map((course) => (
                <Chip
                  key={course.slug}
                  variant="flat"
                  size="lg"
                  className="font-sans font-semibold"
                >
                  {course.name} — in development
                </Chip>
              ))}
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
