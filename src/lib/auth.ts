/**
 * Shared-password gate for the ECC POCUS module pages.
 *
 * Three passwords, entered on the same gate page, unlock three roles:
 *
 *  - learner  (ECC_POCUS_LEARNER_PASSWORD) — the student modules only.
 *  - faculty  (ECC_POCUS_PASSWORD)         — student and teacher modules.
 *  - editor   (ECC_POCUS_EDITOR_PASSWORD)  — faculty access plus editing.
 *
 * Cookies store a hash of the password (never the password itself), and
 * every check runs on the server — no password is present in the client
 * bundle. Rotating a password invalidates the cookies issued for it.
 *
 * This is a simple shared secret for course materials, not account-level
 * security: anyone a password is shared with can open what it unlocks,
 * and a shared password cannot identify individual students.
 */

export type Role = "learner" | "faculty" | "editor";

export const AUTH_COOKIE = "ecc-pocus-access";
export const ROLE_COOKIE = "ecc-pocus-role";

/** ~180 days, in seconds — faculty stay signed in for the academic year. */
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

/** ~120 days — students stay signed in for roughly a semester. */
export const LEARNER_COOKIE_MAX_AGE = 60 * 60 * 24 * 120;

function getPassword(): string {
  return process.env.ECC_POCUS_PASSWORD ?? "PHSUPOCUS26";
}

/**
 * The editor password unlocks the in-browser page editor on top of
 * normal access. TODO: change the default, or override it with the
 * ECC_POCUS_EDITOR_PASSWORD environment variable.
 */
function getEditorPassword(): string {
  return process.env.ECC_POCUS_EDITOR_PASSWORD ?? "PHSUEDITOR26";
}

/**
 * The learner password has no built-in default: student access stays
 * switched off until ECC_POCUS_LEARNER_PASSWORD is set, so a forgotten
 * deployment setting fails closed rather than shipping a guessable
 * password. Rotate it each semester by changing the variable.
 */
function getLearnerPassword(): string | undefined {
  const value = process.env.ECC_POCUS_LEARNER_PASSWORD?.trim();
  return value ? value : undefined;
}

/** Whether a learner password is configured (i.e. students can sign in). */
export function learnerAccessEnabled(): boolean {
  return getLearnerPassword() !== undefined;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The value a valid faculty access cookie must hold. */
export async function getExpectedToken(): Promise<string> {
  return sha256Hex(`ecc-pocus:${getPassword()}`);
}

/** The value a valid editor-role cookie must hold. */
export async function getExpectedEditorToken(): Promise<string> {
  return sha256Hex(`ecc-pocus-editor:${getEditorPassword()}`);
}

/** The value a valid learner access cookie must hold, or null if disabled. */
export async function getExpectedLearnerToken(): Promise<string | null> {
  const password = getLearnerPassword();
  return password ? sha256Hex(`ecc-pocus-learner:${password}`) : null;
}

export function verifyPassword(candidate: string): boolean {
  return candidate === getPassword();
}

export function verifyEditorPassword(candidate: string): boolean {
  return candidate === getEditorPassword();
}

export function verifyLearnerPassword(candidate: string): boolean {
  const password = getLearnerPassword();
  return password !== undefined && candidate === password;
}

/**
 * Works out the role a request carries from its two cookies. Shared by
 * the middleware (edge) and the server helpers, so there is exactly one
 * definition of "who is this".
 *
 * The access cookie holds either the faculty token or the learner token;
 * the role cookie only ever upgrades a faculty session to editor.
 */
export async function resolveRole(
  accessToken: string | undefined,
  roleToken: string | undefined,
): Promise<Role | null> {
  if (!accessToken) return null;

  if (accessToken === (await getExpectedToken())) {
    return roleToken && roleToken === (await getExpectedEditorToken())
      ? "editor"
      : "faculty";
  }

  const learnerToken = await getExpectedLearnerToken();
  if (learnerToken && accessToken === learnerToken) return "learner";

  return null;
}

/**
 * Validates a post-login destination. Only in-site module pages are
 * honoured, so the gate can never bounce someone to another origin or
 * into a route their role can't open.
 */
export function safeNextPath(candidate: unknown): string | null {
  if (typeof candidate !== "string") return null;
  return /^\/modules(\/[A-Za-z0-9_-]+)*\/?$/.test(candidate) ? candidate : null;
}

/** /modules/<course>/<module>/teacher — the faculty-only page. */
export const TEACHER_PAGE = /^\/modules\/([^/]+)\/([^/]+)\/teacher\/?$/;

/**
 * Where a signed-in visitor should land. Learners are pointed at the
 * student version of a teacher URL up front, rather than relying on the
 * middleware to bounce them — a redirect issued from a server action is
 * followed inside the request, which would leave the teacher path in the
 * address bar even though the student page is what renders.
 */
export function destinationFor(role: Role, next: string | null): string {
  const path = next ?? "/modules";
  if (role === "learner") {
    const teacher = path.match(TEACHER_PAGE);
    if (teacher) return `/modules/${teacher[1]}/${teacher[2]}/student`;
  }
  return path;
}
