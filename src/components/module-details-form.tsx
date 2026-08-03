"use client";

import { Button, Chip, Input, Textarea } from "@heroui/react";
import Link from "next/link";
import { useActionState } from "react";
import { updateModuleDetails } from "@/app/editor/actions";
import type { ModuleDef } from "@/data/modules";

export function ModuleDetailsForm({
  course,
  module,
}: {
  course: string;
  module: ModuleDef;
}) {
  const [state, formAction, pending] = useActionState(updateModuleDetails, null);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <input type="hidden" name="course" value={course} />
      <input type="hidden" name="module" value={module.slug} />
      <p className="font-sans text-sm text-default-600">
        Module {module.number} · URL slug{" "}
        <code className="font-mono text-xs">{module.slug}</code> (the slug and
        number are fixed so existing links keep working).
      </p>
      <Input
        name="title"
        label="Module title"
        variant="bordered"
        isRequired
        defaultValue={module.title}
        classNames={{ label: "font-sans font-semibold" }}
      />
      <Textarea
        name="description"
        label="One-sentence description"
        description="Shown on the module card in the index."
        variant="bordered"
        minRows={2}
        defaultValue={module.description}
        classNames={{ label: "font-sans font-semibold" }}
      />
      <Input
        name="time"
        label="Estimated student prep time"
        variant="bordered"
        defaultValue={module.time}
        classNames={{ label: "font-sans font-semibold" }}
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          color="primary"
          radius="md"
          isLoading={pending}
          className="font-sans font-semibold"
        >
          Save details
        </Button>
        <Button
          as={Link}
          href="/modules"
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
    </form>
  );
}
