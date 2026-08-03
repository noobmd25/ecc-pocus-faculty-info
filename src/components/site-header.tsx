import Link from "next/link";
import { Chip } from "@heroui/react";
import { LogoutButton } from "./logout-button";
import { PhsuShield } from "./phsu-shield";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";

export function SiteHeader({ editor = false }: { editor?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-6">
        <Link href="/modules" className="flex items-center gap-3">
          <PhsuShield size={26} />
          <span className="leading-tight">
            <span className="block font-sans text-sm font-extrabold tracking-tight">
              {siteConfig.courseShort} · {siteConfig.programShort} Modules
            </span>
            <span className="block font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-default-600">
              {siteConfig.university}
            </span>
          </span>
        </Link>
        {editor && (
          <Chip size="sm" variant="flat" color="warning" className="font-sans font-bold">
            Editor mode
          </Chip>
        )}
        <span className="flex-1" />
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
