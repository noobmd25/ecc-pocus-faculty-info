/**
 * PHSU design tokens — ported verbatim from the PHSU Design System
 * (derived from the Visual Brand Guidelines at branding.phsu.edu).
 *
 * Each brand colour keeps its exact published value (the `brand` field,
 * which sits at its `anchor` step in the ramp) and gains a ten-step tonal
 * scale generated in OKLCH along its own hue line.
 *
 * `action` pairs are the WCAG-AA-verified solid-button colours per mode.
 * `text` is the AA-safe accent/link colour per mode.
 * `flat` pairs back tinted "flat" surfaces with a readable foreground.
 *
 * CommonJS on purpose: this file is consumed by tailwind.config.js.
 */

const ink = "#0B2324";
const paper = "#FFFFFF";
const surfaceDark = "#08191A";

const palettes = {
  teal: {
    name: "Primary Teal",
    brand: "#00999A",
    pantone: "3272 C",
    anchor: 500,
    ramp: {
      50: "#EBFBFA", 100: "#D7F3F3", 200: "#B3E6E6", 300: "#86D2D2",
      400: "#52B9B9", 500: "#00999A", 600: "#008485", 700: "#006768",
      800: "#004B4C", 900: "#003333",
    },
    action: { light: { bg: "#008283", fg: "#FFFFFF" }, dark: { bg: "#00999A", fg: ink } },
    text: { light: "#008283", dark: "#00999A" },
    flat: { light: { bg: "#D7F3F3", fg: "#007677" }, dark: { bg: "#0B3A3B", fg: "#2FAEAE" } },
  },
  deep: {
    name: "Deep Teal",
    brand: "#024748",
    pantone: "3302 C",
    anchor: 800,
    ramp: {
      50: "#EFF9F9", 100: "#DFF1F1", 200: "#C2E2E2", 300: "#9DCDCD",
      400: "#77B3B3", 500: "#56999A", 600: "#3B8080", 700: "#226566",
      800: "#024748", 900: "#003334",
    },
    action: { light: { bg: "#024748", fg: "#FFFFFF" }, dark: { bg: "#5F9191", fg: ink } },
    text: { light: "#024748", dark: "#578A8A" },
    flat: { light: { bg: "#DFF1F1", fg: "#024748" }, dark: { bg: "#0C292A", fg: "#659696" } },
  },
  amber: {
    name: "Signal Orange",
    brand: "#F7951D",
    pantone: "1495 C",
    anchor: 400,
    ramp: {
      50: "#FFF5EC", 100: "#FFE8D5", 200: "#FFD1A8", 300: "#FEAF61",
      400: "#F7951D", 500: "#C87500", 600: "#A56000", 700: "#824A00",
      800: "#603500", 900: "#422200",
    },
    action: { light: { bg: "#AC6300", fg: "#FFFFFF" }, dark: { bg: "#F7951D", fg: ink } },
    text: { light: "#AC6300", dark: "#F7951D" },
    flat: { light: { bg: "#FFE8D5", fg: "#9B5900" }, dark: { bg: "#3D3922", fg: "#F7951D" } },
  },
  gray: {
    name: "Cool Gray",
    brand: "#DBDDDC",
    pantone: "Cool Gray 1 C",
    anchor: 200,
    ramp: {
      50: "#F6F7F6", 100: "#ECEDEC", 200: "#DBDDDC", 300: "#C0C3C2",
      400: "#A4A7A5", 500: "#898D8B", 600: "#707472", 700: "#575A59",
      800: "#3F4240", 900: "#2A2C2B",
    },
    action: { light: { bg: "#747575", fg: "#FFFFFF" }, dark: { bg: "#DBDDDC", fg: ink } },
    text: { light: "#747575", dark: "#DBDDDC" },
    flat: { light: { bg: "#ECEDEC", fg: "#696A6A" }, dark: { bg: "#374748", fg: "#DBDDDC" } },
  },
  medicine: {
    name: "School of Medicine",
    brand: "#CD3915",
    pantone: "7597 C",
    anchor: 600,
    ramp: {
      50: "#FFF4F1", 100: "#FFE7E1", 200: "#FFCEC2", 300: "#FFAA95",
      400: "#FE7859", 500: "#E85432", 600: "#CD3915", 700: "#A22200",
      800: "#791600", 900: "#550A00",
    },
    action: { light: { bg: "#CD3915", fg: "#FFFFFF" }, dark: { bg: "#EB5635", fg: ink } },
    text: { light: "#CD3915", dark: "#E34E2D" },
    flat: { light: { bg: "#FFE7E1", fg: "#C6310A" }, dark: { bg: "#342720", fg: "#F76140" } },
  },
  nursing: {
    name: "School of Nursing",
    brand: "#64D6D7",
    pantone: "3242 C",
    anchor: 300,
    ramp: {
      50: "#E6FCFC", 100: "#CFF6F6", 200: "#A2EAEA", 300: "#64D6D7",
      400: "#01BDBF", 500: "#00A0A2", 600: "#008485", 700: "#006768",
      800: "#004B4C", 900: "#003334",
    },
    action: { light: { bg: "#118283", fg: "#FFFFFF" }, dark: { bg: "#64D6D7", fg: ink } },
    text: { light: "#118283", dark: "#64D6D7" },
    flat: { light: { bg: "#CFF6F6", fg: "#047779" }, dark: { bg: "#1F4647", fg: "#64D6D7" } },
  },
  dental: {
    name: "School of Dental Medicine",
    brand: "#7D0D5C",
    pantone: "235 C",
    anchor: 800,
    ramp: {
      50: "#FFF3F9", 100: "#FFE4F3", 200: "#FFC8E7", 300: "#FE9FD7",
      400: "#EC78BF", 500: "#D455A7", 600: "#B73A8C", 700: "#971D71",
      800: "#7D0D5C", 900: "#52003A",
    },
    action: { light: { bg: "#7D0D5C", fg: "#FFFFFF" }, dark: { bg: "#C867A2", fg: ink } },
    text: { light: "#7D0D5C", dark: "#C25F9C" },
    flat: { light: { bg: "#FFE4F3", fg: "#7D0D5C" }, dark: { bg: "#241E2E", fg: "#CA68A4" } },
  },
  behavioral: {
    name: "School of Behavioral & Brain Sciences",
    brand: "#FBC611",
    pantone: "116 C",
    anchor: 300,
    ramp: {
      50: "#FFF6E0", 100: "#FFEBBA", 200: "#FBD77A", 300: "#FBC611",
      400: "#CCA002", 500: "#AC8700", 600: "#8E6E01", 700: "#6F5600",
      800: "#523E00", 900: "#382900",
    },
    action: { light: { bg: "#917000", fg: "#FFFFFF" }, dark: { bg: "#FBC611", fg: ink } },
    text: { light: "#917000", dark: "#FBC611" },
    flat: { light: { bg: "#FFEBBA", fg: "#836500" }, dark: { bg: "#3D431F", fg: "#FBC611" } },
  },
  publichealth: {
    name: "Public Health Program",
    brand: "#E18872",
    pantone: "486 C",
    anchor: 400,
    ramp: {
      50: "#FFF4F1", 100: "#FFE7E0", 200: "#FFCEC1", 300: "#F7AD9B",
      400: "#E18872", 500: "#CD6D56", 600: "#B1533D", 700: "#913A26",
      800: "#702412", 900: "#521002",
    },
    action: { light: { bg: "#B05E49", fg: "#FFFFFF" }, dark: { bg: "#E18872", fg: ink } },
    text: { light: "#B05E49", dark: "#E18872" },
    flat: { light: { bg: "#FFE7E0", fg: "#A15340" }, dark: { bg: "#383633", fg: "#E28973" } },
  },
};

/** Sub-brand theme id → the palette that drives `primary` in that theme. */
const themePrimary = {
  core: "teal",
  medicine: "medicine",
  nursing: "nursing",
  dental: "dental",
  behavioral: "behavioral",
  publichealth: "publichealth",
};

const layout = {
  dividerWeight: "1px",
  disabledOpacity: ".5",
  fontSize: { tiny: "0.75rem", small: "0.875rem", medium: "1rem", large: "1.125rem" },
  lineHeight: { tiny: "1rem", small: "1.25rem", medium: "1.5rem", large: "1.75rem" },
  radius: { small: "8px", medium: "12px", large: "14px" },
  borderWidth: { small: "1px", medium: "2px", large: "3px" },
  boxShadow: {
    small:
      "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    medium:
      "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
    large:
      "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
  },
};

module.exports = { ink, paper, surfaceDark, palettes, themePrimary, layout };
