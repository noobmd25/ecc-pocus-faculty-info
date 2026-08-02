/**
 * Faculty roster for the hands-on POCUS sessions.
 *
 * TODO: every entry below is a placeholder. Replace names, credentials,
 * bios and emails with the real faculty, and add `photo` paths once
 * headshots are available (drop files in /public/faculty and reference
 * them as "/faculty/<file>.jpg").
 */

export type FacultyMember = {
  slug: string;
  /** Display name, e.g. "Carlos A. González Cobos, MD" */
  name: string;
  /** Post-nominals / certifications shown in the card footer */
  credentials: string;
  /** Role within the POCUS program */
  role: string;
  /** Hands-on station focus areas — rendered as chips */
  focus: string[];
  /** Two–three plain sentences. Brand voice: say it plainly, never hedge. */
  bio: string;
  email?: string;
  /** Optional headshot path under /public. Falls back to initials. */
  photo?: string;
};

export const faculty: FacultyMember[] = [
  {
    slug: "program-director",
    name: "A. Placeholder, MD",
    credentials: "MD · FACEP",
    role: "Program Director",
    focus: ["eFAST", "Cardiac", "Lung"],
    bio: "Emergency physician and the architect of the POCUS curriculum. Leads the cardiac and eFAST stations and signs off on every scanning checklist you will train against.",
    email: "director@psm.edu",
  },
  {
    slug: "associate-director",
    name: "B. Placeholder, MD",
    credentials: "MD · RDMS",
    role: "Associate Director",
    focus: ["Cardiac", "IVC & Volume Status"],
    bio: "Runs the haemodynamic assessment block. Expects you to name the view before you place the probe — and will show you why that habit matters at the bedside.",
    email: "associate@psm.edu",
  },
  {
    slug: "core-faculty-1",
    name: "C. Placeholder, MD",
    credentials: "MD",
    role: "Core Faculty",
    focus: ["Lung", "Soft Tissue", "MSK"],
    bio: "Teaches the thoracic and soft-tissue stations. Known for making students find the pleural line on themselves before they ever scan a model.",
    email: "faculty1@psm.edu",
  },
  {
    slug: "core-faculty-2",
    name: "D. Placeholder, MD",
    credentials: "MD · FACS",
    role: "Core Faculty",
    focus: ["Aorta", "Renal", "DVT"],
    bio: "Surgeon and vascular ultrasound lead. Covers the aorta and two-point compression DVT exams, with an emphasis on the scans that change a disposition.",
    email: "faculty2@psm.edu",
  },
  {
    slug: "core-faculty-3",
    name: "E. Placeholder, MD",
    credentials: "MD",
    role: "Core Faculty",
    focus: ["First-Trimester OB", "Biliary"],
    bio: "Leads the right-upper-quadrant and early-pregnancy stations. Insists that a good gallbladder scan is ninety percent patient positioning.",
    email: "faculty3@psm.edu",
  },
  {
    slug: "skills-lab-coordinator",
    name: "F. Placeholder, RDMS",
    credentials: "RDMS · RVT",
    role: "Simulation & Skills Lab Coordinator",
    focus: ["Knobology", "Image Optimization", "Probe Handling"],
    bio: "Sonographer who runs the machine-fundamentals station. Every cohort starts with her orientation to the probes, presets and ergonomics before touching a patient model.",
    email: "skillslab@psm.edu",
  },
];
