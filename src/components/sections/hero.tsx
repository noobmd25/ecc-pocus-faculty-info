import { Button, Link } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { faculty } from "@/data/faculty";
import { PhsuShield } from "../phsu-shield";

/* TODO: replace the placeholder figures with the program's real numbers. */
const stats = [
  { value: String(faculty.length), label: "Faculty instructors" },
  { value: "4:1", label: "Students per probe" },
  { value: "10+", label: "Core applications" },
  { value: "100%", label: "Hands-on, at the bedside" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div>
          <p className="eyebrow mb-4">
            {siteConfig.university} · {siteConfig.school}
          </p>
          <h1 className="display text-5xl md:text-7xl">
            Ultrasound is a skill of the hands.{" "}
            <em className="subhead font-semibold not-italic tracking-tight text-primary">
              Learn it hands-on.
            </em>
          </h1>
          <p className="subhead mt-6 max-w-[56ch] text-lg font-normal leading-[1.6] text-foreground/90 md:text-xl">
            These are the faculty who put the probe in your hand. Every
            point-of-care ultrasound session is taught live, in small groups,
            by clinicians who scan as part of their daily practice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              as={Link}
              href="#faculty"
              color="primary"
              size="lg"
              radius="md"
              className="font-sans font-semibold"
            >
              Meet the faculty
            </Button>
            <Button
              as={Link}
              href="#sessions"
              variant="bordered"
              color="primary"
              size="lg"
              radius="md"
              className="font-sans font-semibold"
            >
              How sessions run
            </Button>
          </div>
          <dl className="mt-10 flex flex-wrap gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[7rem] flex-1 rounded-[14px] border border-divider bg-content1 px-4 py-3"
              >
                <dd className="font-sans text-2xl font-extrabold tracking-tight text-primary">
                  {stat.value}
                </dd>
                <dt className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.11em] text-default-600">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative hidden place-items-center md:grid">
          <div
            aria-hidden="true"
            className="absolute inset-[-14%] bg-[radial-gradient(circle_at_50%_45%,hsl(var(--heroui-primary)/0.16),transparent_68%)]"
          />
          <PhsuShield size={200} className="relative" />
        </div>
      </div>
    </section>
  );
}
