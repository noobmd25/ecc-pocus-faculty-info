/**
 * Active PHSU sub-brand.
 *
 * The design system ships six switchable sub-brands; changing this one
 * constant re-skins every component on the site. School colour is for
 * unambiguous ownership only — anything institutional or cross-school
 * stays on "core".
 */
export type PhsuSchool =
  | "core"
  | "medicine"
  | "nursing"
  | "dental"
  | "behavioral"
  | "publichealth";

export const ACTIVE_SCHOOL: PhsuSchool = "medicine";

export const THEME_CLASS = {
  light: `phsu-${ACTIVE_SCHOOL}`,
  dark: `phsu-${ACTIVE_SCHOOL}-dark`,
} as const;
