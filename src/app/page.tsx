import { Card, CardBody } from "@heroui/react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { PhsuShield } from "@/components/phsu-shield";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { safeNextPath } from "@/lib/auth";
import { getRole } from "@/lib/role";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const { next: rawNext } = await searchParams;
  const next = safeNextPath(Array.isArray(rawNext) ? rawNext[0] : rawNext);

  // Already signed in (any role): straight through to where they were going.
  if (await getRole()) redirect(next ?? "/modules");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      <Card shadow="md" radius="lg" className="w-full max-w-md">
        <CardBody className="gap-6 p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <PhsuShield size={56} />
            <div>
              <p className="eyebrow mb-2">{siteConfig.university}</p>
              <h1 className="display text-2xl">
                {siteConfig.courseName} · {siteConfig.programShort}
              </h1>
              <p className="subhead mt-3 text-sm font-normal leading-relaxed text-foreground/80">
                The student and teacher modules for the hands-on ultrasound
                sessions.
              </p>
            </div>
          </div>
          <LoginForm next={next ?? undefined} />
        </CardBody>
      </Card>

      <p className="mt-6 max-w-md text-center font-sans text-xs leading-relaxed text-default-600">
        Students: use the password shared for your {siteConfig.courseShort}{" "}
        course. Faculty: use the faculty password. Need one? Ask the course
        director.
      </p>
    </div>
  );
}
