import { ContactCta } from "@/components/sections/contact-cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Sessions } from "@/components/sections/sessions";
import { FacultyCard } from "@/components/faculty-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { faculty } from "@/data/faculty";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <Hero />

        <section id="faculty" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="eyebrow mb-4">The people at the probe</p>
            <h2 className="display max-w-[24ch] text-3xl md:text-4xl">
              Meet your instructors
            </h2>
            <p className="subhead mt-4 max-w-[60ch] text-lg font-normal leading-[1.6] text-foreground/90">
              Every instructor below teaches at the bedside, in person, at
              every hands-on session. Find your station lead before you
              arrive.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {faculty.map((member) => (
                <FacultyCard key={member.slug} member={member} />
              ))}
            </div>
          </div>
        </section>

        <Sessions />
        <Faq />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  );
}
