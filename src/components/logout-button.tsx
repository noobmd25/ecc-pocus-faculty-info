"use client";

import { Button } from "@heroui/react";
import { logout } from "@/app/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        size="sm"
        variant="bordered"
        radius="md"
        className="font-sans font-semibold"
      >
        Sign out
      </Button>
    </form>
  );
}
