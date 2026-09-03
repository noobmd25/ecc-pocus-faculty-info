"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE,
  AUTH_COOKIE_MAX_AGE,
  LEARNER_COOKIE_MAX_AGE,
  ROLE_COOKIE,
  getExpectedEditorToken,
  getExpectedLearnerToken,
  getExpectedToken,
  safeNextPath,
  verifyEditorPassword,
  verifyLearnerPassword,
  verifyPassword,
} from "@/lib/auth";

export type LoginState = { error: string } | null;

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next")) ?? "/modules";

  // Faculty passwords take precedence, so a misconfigured deployment that
  // reuses one value never demotes faculty to the learner view.
  const role = verifyEditorPassword(password)
    ? "editor"
    : verifyPassword(password)
      ? "faculty"
      : verifyLearnerPassword(password)
        ? "learner"
        : null;

  if (!role) {
    return { error: "That password is not correct. Check with the course director." };
  }

  const store = await cookies();

  if (role === "learner") {
    const token = await getExpectedLearnerToken();
    if (!token) return { error: "Student access is not set up yet." };
    store.set(AUTH_COOKIE, token, {
      ...cookieOptions,
      maxAge: LEARNER_COOKIE_MAX_AGE,
    });
    store.delete(ROLE_COOKIE);
  } else {
    store.set(AUTH_COOKIE, await getExpectedToken(), {
      ...cookieOptions,
      maxAge: AUTH_COOKIE_MAX_AGE,
    });
    if (role === "editor") {
      store.set(ROLE_COOKIE, await getExpectedEditorToken(), {
        ...cookieOptions,
        maxAge: AUTH_COOKIE_MAX_AGE,
      });
    } else {
      store.delete(ROLE_COOKIE);
    }
  }

  redirect(next);
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
  store.delete(ROLE_COOKIE);
  redirect("/");
}
