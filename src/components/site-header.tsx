import Link from "next/link";
import { Chip } from "@heroui/react";
import { LogoutButton } from "./logout-button";
import { PhsuShield } from "./phsu-shield";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";
import type { Role } from "@/lib/auth";
import { sanityEnabled, studioUrl } from "@/sanity/env";

export function SiteHeader({ role = null }: { role?: Role | null }) {
  const editor = role === "editor";

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
        {role === "learner" && (
          <Chip size="sm" variant="flat" color="primary" className="font-sans font-bold">
            Student
          </Chip>
        )}
        <span className="flex-1" />
        {editor && sanityEnabled && studioUrl && (
          <a
            href={studioUrl}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-sm font-semibold text-primary"
          >
            Studio
          </a>
        )}
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
