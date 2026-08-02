/**
 * Module library for the ECC hands-on POCUS sessions.
 *
 * TODO: the entries below are placeholders. To publish a module, either
 *   - drop the file into public/modules/teacher/ or public/modules/student/
 *     and set href to "/modules/teacher/<file>.pdf", or
 *   - paste an external link (Canvas page, Google Drive, etc.) as href.
 * A module with href "#" renders as "Not posted yet".
 */

export type ModuleLink = {
  title: string;
  description: string;
  href: string;
};

export const teacherModules: ModuleLink[] = [
  {
    title: "Machine Fundamentals & Knobology",
    description:
      "Facilitator guide for the orientation station: probes, presets, gain, depth and ergonomics, with the checkpoints to verify before students move on.",
    href: "#",
  },
  {
    title: "Cardiac",
    description:
      "Teaching script for the core cardiac views, common student errors, and the bedside prompts that tie the scan to the cardiovascular exam.",
    href: "#",
  },
  {
    title: "Lung",
    description:
      "Facilitator guide for pleural line, lung sliding and B-lines, integrated with the respiratory physical exam findings students just practiced.",
    href: "#",
  },
  {
    title: "eFAST",
    description:
      "Station guide for the eFAST sequence, model positioning, and the acquisition checklist used to score student images.",
    href: "#",
  },
  {
    title: "Aorta & IVC",
    description:
      "Teaching notes for aorta measurement and IVC assessment, with the history-taking threads that should prompt each scan.",
    href: "#",
  },
];

export const studentModules: ModuleLink[] = [
  {
    title: "Machine Fundamentals & Knobology",
    description:
      "Pre-session reading: what each probe is for, the five knobs you will actually use, and how to hold the probe so your image stays still.",
    href: "#",
  },
  {
    title: "Cardiac",
    description:
      "The core cardiac views, the anatomy behind each one, and what to review before you place the probe at the session.",
    href: "#",
  },
  {
    title: "Lung",
    description:
      "Pleural line, lung sliding and B-lines — what they mean and how they connect to the respiratory exam you are learning in ECC.",
    href: "#",
  },
  {
    title: "eFAST",
    description:
      "The eFAST sequence and the target views you will be expected to acquire, in the order you will scan them.",
    href: "#",
  },
  {
    title: "Aorta & IVC",
    description:
      "Measuring the aorta, assessing the IVC, and the clinical questions each scan answers.",
    href: "#",
  },
];
