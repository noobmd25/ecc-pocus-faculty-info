import { siteConfig } from "@/config/site";
import { PhsuShield } from "./phsu-shield";

export function SiteFooter() {
  return (
    <footer className="border-t border-divider">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <PhsuShield size={24} />
            <span className="font-sans text-sm font-bold">
              {siteConfig.programName}
            </span>
          </div>
          <p className="max-w-[56ch] font-sans text-xs leading-relaxed text-default-600">
            {siteConfig.school} · {siteConfig.university}. Built on the PHSU
            Design System — every colour pairing on this page is verified
            against WCAG 2.1 AA.
          </p>
        </div>
        <p className="font-sans text-xs text-default-600">
          © {new Date().getFullYear()} {siteConfig.university}
        </p>
      </div>
    </footer>
  );
}
