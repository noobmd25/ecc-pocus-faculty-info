import { ModuleCard } from "@/components/module-card";
import { LogoutButton } from "@/components/logout-button";
import { PhsuShield } from "@/components/phsu-shield";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { studentModules, teacherModules } from "@/data/modules";

export const metadata = {
  title: `Modules · ${siteConfig.courseShort} ${siteConfig.programShort}`,
};

export default function ModulesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-divider bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-6">
          <PhsuShield size={26} />
          <div className="leading-tight">
            <p className="font-sans text-sm font-extrabold tracking-tight">
              {siteConfig.courseShort} · {siteConfig.programShort} Modules
            </p>
            <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-default-600">
              {siteConfig.university}
            </p>
          </div>
          <span className="flex-1" />
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-20">
        <div className="pt-12">
          <p className="eyebrow mb-3">{siteConfig.courseName}</p>
          <h1 className="display text-3xl md:text-4xl">Session modules</h1>
          <p className="subhead mt-3 max-w-[60ch] font-normal leading-[1.6] text-foreground/85">
            Review the teacher guide and the matching student module before
            each hands-on session, so the whole faculty runs the same station
            the same way.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-sans text-xl font-bold tracking-tight">
            Teacher modules
          </h2>
          <p className="mt-1 font-sans text-sm text-default-600">
            Facilitator guides, station scripts and scoring checklists.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teacherModules.map((module) => (
              <ModuleCard key={module.title} module={module} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-sans text-xl font-bold tracking-tight">
            Student modules
          </h2>
          <p className="mt-1 font-sans text-sm text-default-600">
            The pre-session reading assigned to students — know what they were
            asked to know.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studentModules.map((module) => (
              <ModuleCard key={module.title} module={module} />
            ))}
          </div>
        </section>
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
