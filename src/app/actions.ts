"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE,
  AUTH_COOKIE_MAX_AGE,
  ROLE_COOKIE,
  getExpectedEditorToken,
  getExpectedToken,
  verifyEditorPassword,
  verifyPassword,
} from "@/lib/auth";

export type LoginState = { error: string } | null;

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: AUTH_COOKIE_MAX_AGE,
} as const;

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  const isViewer = verifyPassword(password);
  const isEditorLogin = verifyEditorPassword(password);

  if (!isViewer && !isEditorLogin) {
    return { error: "That password is not correct. Check with the course director." };
  }

  const store = await cookies();
  store.set(AUTH_COOKIE, await getExpectedToken(), cookieOptions);
  if (isEditorLogin) {
    store.set(ROLE_COOKIE, await getExpectedEditorToken(), cookieOptions);
  } else {
    store.delete(ROLE_COOKIE);
  }

  redirect("/modules");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
  store.delete(ROLE_COOKIE);
  redirect("/");
}
