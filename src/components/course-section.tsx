"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * A course heading that collapses its module grid.
 *
 * The heading text is the toggle; `action` (the editor-only "+ Add module"
 * button) sits outside it, so clicking that never folds the section shut.
 *
 * The open/closed animation is the CSS grid-rows 0fr→1fr trick rather than a
 * measured max-height: it animates to the content's real height, whatever
 * that is, so a course with two modules and one with nine both look right.
 */
export function CourseSection({
  name,
  fullName,
  action,
  defaultOpen = true,
  children,
}: {
  name: string;
  fullName?: string;
  action?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="min-w-0">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group flex items-center gap-2.5 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 shrink-0 text-default-500 transition-transform duration-200 group-hover:text-primary motion-reduce:transition-none ${
                open ? "rotate-90" : ""
              }`}
            >
              <path d="M7 4l6 6-6 6" />
            </svg>
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-sans text-xl font-bold tracking-tight">
                {name}
              </span>
              {fullName && (
                <span className="font-sans text-sm font-normal text-default-600">
                  {fullName}
                </span>
              )}
            </span>
          </button>
        </h2>
        {action && (
          <>
            <span className="flex-1" />
            {action}
          </>
        )}
      </div>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        {/* Kept mounted so the height can animate; `inert` takes the collapsed
            cards out of the tab order and the accessibility tree.

            The clipping this needs would otherwise slice the cards' drop
            shadows off flat, so the box is widened by 12px a side (and the
            negative margin puts the cards back in line with the heading).
            Bottom clearance is padding on the inner wrapper instead —
            padding on the clipper itself can't collapse below its own
            height, which would leave a sliver showing when closed. */}
        <div className="-mx-3 overflow-hidden px-3" inert={!open}>
          <div className="pb-3">{children}</div>
        </div>
      </div>
    </section>
  );
}
