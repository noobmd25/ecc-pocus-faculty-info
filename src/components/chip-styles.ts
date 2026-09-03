/**
 * Readable colour pairs for small role/label chips.
 *
 * HeroUI's `variant="flat" color="primary"` recipe is bg-primary/20 with
 * text-primary-600, which on the PHSU Medicine ramp measures ~3.7:1 in
 * light mode and ~2.9:1 in dark mode — below the 4.5:1 AA floor for
 * 12px bold text. These are the "flat" pairs from src/phsu/tokens.js
 * (light: primary-700 on primary-100 ≈ 5.6:1; dark: primary-400 on the
 * token's #342720 tint ≈ 5.6:1). The dark theme keeps the same ramp, so
 * the tint has to be spelled out rather than picked from primary-*.
 */
export const readablePrimaryChip = {
  base: "bg-primary-100 dark:bg-[#342720]",
  content: "text-primary-700 dark:text-primary-400",
} as const;
