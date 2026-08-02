/**
 * Builds the six PHSU sub-brand themes (light + dark variants each) for the
 * HeroUI Tailwind plugin, following the config emitted by the PHSU Design
 * System page:
 *
 *   - `primary`   — the active school colour. DEFAULT is stepped so a solid
 *                   button label clears WCAG AA; the true brand value keeps
 *                   its anchor step in the ramp.
 *   - `secondary` — Deep Teal #024748, identical in every theme. The
 *                   institutional anchor that keeps sub-branded pages
 *                   recognisably PHSU.
 *   - `warning`   — Signal Orange at brand value. Foreground is ink, never
 *                   white (2.26:1 vs 7.24:1).
 *   - `danger`    — Medicine red, 5.01:1 with white at brand value.
 *   - `success`   — Teal 600. Success is teal, not green — green is not in
 *                   the PHSU palette.
 *   - `default`   — the Cool Gray ramp: surfaces, dividers, disabled states.
 */

const { ink, surfaceDark, palettes, themePrimary } = require("./tokens");

function phsuThemes() {
  const S = palettes.deep;
  const N = palettes.gray;
  const themes = {};

  for (const [id, paletteKey] of Object.entries(themePrimary)) {
    const P = palettes[paletteKey];

    themes[`phsu-${id}`] = {
      extend: "light",
      colors: {
        background: "#FFFFFF",
        foreground: ink,
        divider: "rgba(11, 35, 36, 0.13)",
        focus: P.action.light.bg,
        content1: { DEFAULT: "#FFFFFF", foreground: ink },
        content2: { DEFAULT: "#F5F8F8", foreground: ink },
        content3: { DEFAULT: "#E7EEEE", foreground: ink },
        content4: { DEFAULT: "#D4E0E0", foreground: ink },
        default: { ...N.ramp, DEFAULT: N.ramp[200], foreground: ink },
        primary: { ...P.ramp, DEFAULT: P.action.light.bg, foreground: P.action.light.fg },
        secondary: { ...S.ramp, DEFAULT: S.brand, foreground: "#FFFFFF" },
        success: { DEFAULT: palettes.teal.action.light.bg, foreground: "#FFFFFF" },
        warning: { ...palettes.amber.ramp, DEFAULT: palettes.amber.brand, foreground: ink },
        danger: { ...palettes.medicine.ramp, DEFAULT: palettes.medicine.brand, foreground: "#FFFFFF" },
      },
    };

    themes[`phsu-${id}-dark`] = {
      extend: "dark",
      colors: {
        background: surfaceDark,
        foreground: "#EAF3F3",
        divider: "rgba(190, 225, 225, 0.16)",
        focus: P.ramp[300],
        content1: { DEFAULT: "#0E2223", foreground: "#EAF3F3" },
        content2: { DEFAULT: "#132C2D", foreground: "#EAF3F3" },
        content3: { DEFAULT: "#1B393A", foreground: "#EAF3F3" },
        primary: { ...P.ramp, DEFAULT: P.action.dark.bg, foreground: P.action.dark.fg },
        secondary: { ...S.ramp, DEFAULT: S.action.dark.bg, foreground: S.action.dark.fg },
        success: { DEFAULT: palettes.teal.action.dark.bg, foreground: palettes.teal.action.dark.fg },
        warning: { ...palettes.amber.ramp, DEFAULT: palettes.amber.brand, foreground: ink },
        danger: {
          ...palettes.medicine.ramp,
          DEFAULT: palettes.medicine.action.dark.bg,
          foreground: palettes.medicine.action.dark.fg,
        },
      },
    };
  }

  return themes;
}

module.exports = { phsuThemes };
