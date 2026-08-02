"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { THEME_CLASS } from "@/config/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark"]}
        value={{ light: THEME_CLASS.light, dark: THEME_CLASS.dark }}
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
