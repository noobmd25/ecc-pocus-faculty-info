"use client";

import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { saveModuleDoc } from "@/app/editor/actions";
import { MarkdownDoc } from "./markdown-doc";

export function EditorForm({
  course,
  module: moduleSlug,
  doc,
  initialContent,
  backHref,
}: {
  course: string;
  module: string;
  doc: string;
  initialContent: string;
  backHref: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [state, formAction, pending] = useActionState(saveModuleDoc, null);
  const dirty = content !== initialContent;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="course" value={course} />
      <input type="hidden" name="module" value={moduleSlug} />
      <input type="hidden" name="doc" value={doc} />
      <input type="hidden" name="content" value={content} />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          color="primary"
          radius="md"
          isLoading={pending}
          isDisabled={!dirty && state?.ok !== false}
          className="font-sans font-semibold"
        >
          Save
        </Button>
        <Button
          as={Link}
          href={backHref}
          variant="bordered"
          radius="md"
          className="font-sans font-semibold"
        >
          Done
        </Button>
        {state && (
          <Chip
            variant="flat"
            color={state.ok ? "success" : "danger"}
            className="max-w-full whitespace-normal font-sans font-medium"
          >
            {state.message}
          </Chip>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.11em] text-default-600">
            Markdown
          </span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            spellCheck={false}
            className="h-[70vh] w-full resize-y rounded-[12px] border border-divider bg-content1 p-4 font-mono text-[13px] leading-relaxed text-foreground outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.11em] text-default-600">
            Preview
          </span>
          <div className="h-[70vh] overflow-y-auto rounded-[12px] border border-divider bg-content1 p-6">
            <MarkdownDoc>{content}</MarkdownDoc>
          </div>
        </div>
      </div>

      <details className="rounded-[12px] border border-divider bg-content2 px-4 py-3 font-sans text-sm">
        <summary className="cursor-pointer font-semibold">Formatting cheat sheet</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-default-700">
          <li><code className="font-mono text-xs">## Heading</code> for a section, <code className="font-mono text-xs">### Subhead</code> for a subsection</li>
          <li><code className="font-mono text-xs">- item</code> for bullets, <code className="font-mono text-xs">**bold**</code>, <code className="font-mono text-xs">*italic*</code></li>
          <li><code className="font-mono text-xs">[link text](https://…)</code> for links</li>
          <li>End a line with <code className="font-mono text-xs">\</code> to force a line break (used in the self-assessment options)</li>
          <li>Checklist tables: keep the <code className="font-mono text-xs">| cell | cell |</code> rows aligned with the header row</li>
        </ul>
      </details>
    </form>
  );
}
