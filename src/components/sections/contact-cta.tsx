import { Button, Link } from "@heroui/react";
import { siteConfig } from "@/config/site";

export function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-20 bg-secondary-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div>
          <p className="eyebrow mb-3 text-primary-300">Contact</p>
          <h2 className="display text-3xl md:text-4xl">
            Questions about a session?
          </h2>
          <p className="subhead mt-3 max-w-[52ch] font-normal leading-[1.6] text-white/85">
            Scheduling, make-ups, accommodations, or anything about the
            curriculum — write to the program and you will get a direct answer.
          </p>
        </div>
        <Button
          as={Link}
          href={`mailto:${siteConfig.contactEmail}`}
          size="lg"
          radius="md"
          className="shrink-0 bg-white font-sans font-semibold text-secondary-900"
        >
          {siteConfig.contactEmail}
        </Button>
      </div>
    </section>
  );
}
