/**
 * Site-wide settings. Edit these first when adapting the boilerplate.
 */
export const siteConfig = {
  /** Institution */
  university: "Ponce Health Sciences University",
  school: "School of Medicine",

  /** Program identity */
  programName: "Point-of-Care Ultrasound Program",
  programShort: "POCUS",

  /** Page copy anchors */
  title: "POCUS Faculty · Ponce Health Sciences University",
  description:
    "Meet the faculty who lead the hands-on point-of-care ultrasound sessions for medical students at Ponce Health Sciences University.",

  /** TODO: replace with the program's real contact address. */
  contactEmail: "pocus@psm.edu",

  nav: [
    { label: "Faculty", href: "#faculty" },
    { label: "Sessions", href: "#sessions" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
