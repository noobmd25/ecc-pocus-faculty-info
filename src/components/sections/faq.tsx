"use client";

import { Accordion, AccordionItem } from "@heroui/react";

/* TODO: confirm each answer with the program before publishing. */
const faqs = [
  {
    q: "What should I bring to a session?",
    a: "Yourself, on time, in clothing you can scan and be scanned in. Probes, gel, towels and machines are provided by the skills lab. Bring your acquisition checklist if one was assigned.",
  },
  {
    q: "How should I prepare?",
    a: "Complete the assigned pre-session module before you arrive. Session time is for scanning — students who arrive knowing the anatomy and the target views get far more out of their time on the probe.",
  },
  {
    q: "Will I actually scan, or mostly observe?",
    a: "You will scan. Groups are capped so that every student acquires every required view at every station, with faculty correcting technique in real time.",
  },
  {
    q: "How is my progress assessed?",
    a: "Faculty score your acquired images against the program's checklists during the session. You get the feedback the same day, and the record follows you across the curriculum blocks.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="eyebrow mb-4">Before you arrive</p>
        <h2 className="display text-3xl md:text-4xl">Common questions</h2>
        <Accordion className="mt-8" variant="bordered">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.q}
              aria-label={faq.q}
              title={<span className="font-sans text-sm font-semibold">{faq.q}</span>}
            >
              <p className="prose-phsu pb-2 text-sm">{faq.a}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
