"use client";

import { Button, Chip, Input, Textarea } from "@heroui/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { createModule } from "@/app/editor/actions";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function NewModuleForm({
  course,
  nextNumber,
}: {
  course: string;
  nextNumber: number;
}) {
  const [state, formAction, pending] = useActionState(createModule, null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-start gap-4">
        <Chip variant="flat" color="success" className="max-w-full whitespace-normal font-sans font-medium">
          {state.message}
        </Chip>
        <div className="flex flex-wrap gap-3">
          {state.live && (
            <>
              <Button
                as={Link}
                href={`/editor/${state.courseSlug}/${state.moduleSlug}/student`}
                color="primary"
                radius="md"
                className="font-sans font-semibold"
              >
                Edit the student module
              </Button>
              <Button
                as={Link}
                href={`/editor/${state.courseSlug}/${state.moduleSlug}/teacher`}
                variant="bordered"
                color="primary"
                radius="md"
                className="font-sans font-semibold"
              >
                Edit the teacher notes
              </Button>
            </>
          )}
          <Button
            as={Link}
            href="/modules"
            variant="light"
            color="primary"
            radius="md"
            className="font-sans font-semibold"
          >
            Back to all modules
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <input type="hidden" name="course" value={course} />
      <Input
        name="title"
        label="Module title"
        placeholder={`e.g., Vascular Access & Procedural Guidance`}
        variant="bordered"
        isRequired
        value={title}
        onValueChange={setTitle}
        classNames={{ label: "font-sans font-semibold" }}
      />
      <Input
        name="slug"
        label="URL slug"
        description="Lowercase letters, numbers and dashes — becomes part of the page address."
        variant="bordered"
        isRequired
        value={effectiveSlug}
        onValueChange={(value) => {
          setSlugTouched(true);
          setSlug(slugify(value));
        }}
        classNames={{ label: "font-sans font-semibold" }}
      />
      <Textarea
        name="description"
        label="One-sentence description"
        description="Shown on the module card in the index."
        variant="bordered"
        minRows={2}
        classNames={{ label: "font-sans font-semibold" }}
      />
      <Input
        name="time"
        label="Estimated student prep time"
        placeholder="60 min"
        defaultValue="60 min"
        variant="bordered"
        classNames={{ label: "font-sans font-semibold" }}
      />
      <p className="font-sans text-sm text-default-600">
        This will be <b>Module {nextNumber}</b>. It is created with starter
        student, teacher and checklist pages that you then fill in with the
        editor.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          color="primary"
          radius="md"
          isLoading={pending}
          className="font-sans font-semibold"
        >
          Create module
        </Button>
        <Button
          as={Link}
          href="/modules"
          variant="bordered"
          radius="md"
          className="font-sans font-semibold"
        >
          Cancel
        </Button>
        {state && !state.ok && (
          <Chip variant="flat" color="danger" className="max-w-full whitespace-normal font-sans font-medium">
            {state.message}
          </Chip>
        )}
      </div>
    </form>
  );
}
