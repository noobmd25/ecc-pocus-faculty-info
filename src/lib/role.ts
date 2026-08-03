import { cookies } from "next/headers";
import { getExpectedEditorToken, ROLE_COOKIE } from "./auth";

/**
 * Whether the current request carries a valid editor-role cookie.
 * Server-side only (pages, server actions) — not for middleware.
 */
export async function isEditor(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ROLE_COOKIE)?.value;
  return Boolean(token) && token === (await getExpectedEditorToken());
}
