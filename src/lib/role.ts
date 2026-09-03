import { cookies } from "next/headers";
import { AUTH_COOKIE, ROLE_COOKIE, resolveRole, type Role } from "./auth";

/**
 * The role of the current request, from its cookies. Server-side only
 * (pages, server actions) — the middleware uses resolveRole directly.
 */
export async function getRole(): Promise<Role | null> {
  const store = await cookies();
  return resolveRole(
    store.get(AUTH_COOKIE)?.value,
    store.get(ROLE_COOKIE)?.value,
  );
}

/** Whether the current request carries a valid editor session. */
export async function isEditor(): Promise<boolean> {
  return (await getRole()) === "editor";
}
