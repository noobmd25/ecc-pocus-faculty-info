import { Card, CardBody, CardHeader, Chip } from "@heroui/react";

const format = [
  {
    step: "01",
    title: "Small groups at the machine",
    body: "Four to five students per station, one faculty member at every probe. Nobody watches from the back row — every student scans at every station.",
  },
  {
    step: "02",
    title: "Live scanning, real anatomy",
    body: "You scan standardized patients and peer models on the same machines used in the clinical setting. Image acquisition is learned by acquiring images, not by watching slides.",
  },
  {
    step: "03",
    title: "Structured, immediate feedback",
    body: "Faculty review your images against the program's acquisition checklists on the spot. You leave each session knowing exactly what to refine before the next one.",
  },
];

/* TODO: adjust to the real station list for the current academic year. */
const stations = [
  "eFAST",
  "Cardiac",
  "Lung",
  "IVC & Volume Status",
  "Aorta",
  "Renal",
  "Biliary",
  "First-Trimester OB",
  "DVT",
  "Soft Tissue & MSK",
];

export function Sessions() {
  return (
    <section id="sessions" className="scroll-mt-20 bg-content2">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="eyebrow mb-4">The hands-on sessions</p>
        <h2 className="display max-w-[24ch] text-3xl md:text-4xl">
          How a session runs
        </h2>
        <p className="subhead mt-4 max-w-[60ch] text-lg font-normal leading-[1.6] text-foreground/90">
          The format is deliberate: short demonstration, long scanning time,
          faculty at your elbow the whole way.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {format.map((item) => (
            <Card key={item.step} shadow="sm" radius="lg">
              <CardHeader className="flex-col items-start gap-2 px-5 pt-5">
                <span className="font-mono text-[11px] font-semibold tracking-wide text-primary">
                  {item.step}
                </span>
                <h3 className="font-sans text-lg font-bold tracking-tight">
                  {item.title}
                </h3>
              </CardHeader>
              <CardBody className="px-5 pb-5 pt-0">
                <p className="font-baskerville text-sm leading-[1.75]">
                  {item.body}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        <h3 className="mt-12 font-sans text-lg font-bold tracking-tight">
          Scanning stations
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {stations.map((station) => (
            <Chip
              key={station}
              variant="bordered"
              color="secondary"
              className="font-sans font-semibold"
            >
              {station}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
