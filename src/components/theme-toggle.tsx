"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      variant="bordered"
      radius="md"
      aria-label="Toggle light and dark mode"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (isDark ? "☾" : "☀") : "☀"}
    </Button>
  );
}
