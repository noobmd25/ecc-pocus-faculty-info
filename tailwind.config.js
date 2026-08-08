const { heroui } = require("@heroui/theme");
const { layout } = require("./src/phsu/tokens");
const { phsuThemes } = require("./src/phsu/heroui-themes");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // The dark theme is applied as `phsu-<school>-dark` (see THEME_CLASS in
  // src/config/theme.ts), never a bare `.dark`, so the stock "class" strategy
  // matches nothing and every `dark:` utility silently dies — including the
  // `dark:text-warning` HeroUI puts on flat warning chips, which left them at
  // warning-700 on a dark surface (1.79:1).
  darkMode: ["class", '[class*="-dark"]'],
  theme: {
    extend: {
      fontFamily: {
        // Open Sans — headlines, all UI, buttons, labels, tables, data
        sans: ["var(--font-sans)", "Open Sans", "Arial", "Helvetica", "sans-serif"],
        // Noto Serif — sub-headlines, ledes, pull quotes
        serif: ["var(--font-serif)", "Noto Serif", "Georgia", "serif"],
        // Libre Baskerville — body copy, article text, prose (never under 14px)
        baskerville: [
          "var(--font-baskerville)",
          "Libre Baskerville",
          "Baskerville",
          "Georgia",
          "serif",
        ],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [
    heroui({
      prefix: "heroui",
      defaultTheme: "phsu-medicine",
      layout,
      themes: phsuThemes(),
    }),
  ],
};
