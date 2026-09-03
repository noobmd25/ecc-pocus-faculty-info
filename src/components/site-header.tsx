import Link from "next/link";
import { Chip } from "@heroui/react";
import { LogoutButton } from "./logout-button";
import { PhsuShield } from "./phsu-shield";
import { ThemeToggle } from "./theme-toggle";
import { readablePrimaryChip } from "./chip-styles";
import { siteConfig } from "@/config/site";
import type { Role } from "@/lib/auth";
import { sanityEnabled, studioUrl } from "@/sanity/env";

export function SiteHeader({ role = null }: { role?: Role | null }) {
  const editor = role === "editor";
  const learner = role === "learner";
  // On phones the 64px header has no room for a chip next to the two-line
  // title (nor for the full university name, which wraps at 360px), so
  // the role takes the place of the university line instead.
  const mobileSubtitle = learner
    ? "Student access"
    : editor
      ? "Editor mode"
      : "Faculty access";

  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-6">
        <Link href="/modules" className="flex min-w-0 items-center gap-3">
          <PhsuShield size={26} />
          <span className="min-w-0 leading-tight">
            <span className="block font-sans text-sm font-extrabold tracking-tight">
              {siteConfig.courseShort} · {siteConfig.programShort} Modules
            </span>
            <span className="block font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-default-600">
              <span className="hidden sm:inline">{siteConfig.university}</span>
              <span className="sm:hidden">{mobileSubtitle}</span>
            </span>
          </span>
        </Link>
        {editor && (
          <Chip
            size="sm"
            variant="flat"
            color="warning"
            className="hidden font-sans font-bold sm:inline-flex"
          >
            Editor mode
          </Chip>
        )}
        {learner && (
          <Chip
            size="sm"
            variant="flat"
            classNames={readablePrimaryChip}
            className="hidden font-sans font-bold sm:inline-flex"
          >
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
