import { Card, CardBody } from "@heroui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { PhsuShield } from "@/components/phsu-shield";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { AUTH_COOKIE, getExpectedToken } from "@/lib/auth";

export default async function Home() {
  const store = await cookies();
  if (store.get(AUTH_COOKIE)?.value === (await getExpectedToken())) {
    redirect("/modules");
  }

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
                Faculty access to the teacher and student modules for the
                hands-on ultrasound sessions.
              </p>
            </div>
          </div>
          <LoginForm />
        </CardBody>
      </Card>

      <p className="mt-6 max-w-md text-center font-sans text-xs leading-relaxed text-default-600">
        Access is limited to {siteConfig.courseShort} faculty. Need the
        password? Ask the course director.
      </p>
    </div>
  );
}
