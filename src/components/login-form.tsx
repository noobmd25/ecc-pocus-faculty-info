"use client";

import { Button, Input } from "@heroui/react";
import { useActionState, useEffect, useState } from "react";
import { login } from "@/app/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);
  const [edited, setEdited] = useState(false);

  // Re-arm the error display each time a submission round-trips.
  useEffect(() => setEdited(false), [state]);

  const showError = !edited && Boolean(state?.error);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        name="password"
        type="password"
        label="Access password"
        variant="bordered"
        isRequired
        autoFocus
        autoComplete="current-password"
        validationBehavior="aria"
        isInvalid={showError}
        errorMessage={showError ? state?.error : undefined}
        onValueChange={() => setEdited(true)}
        classNames={{ label: "font-sans font-semibold" }}
      />
      <Button
        type="submit"
        color="primary"
        radius="md"
        isLoading={pending}
        className="font-sans font-semibold"
      >
        Open the modules
      </Button>
    </form>
  );
}
