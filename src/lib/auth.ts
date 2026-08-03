/**
 * Shared-password gate for the ECC POCUS module pages.
 *
 * The password can be overridden without a code change by setting the
 * ECC_POCUS_PASSWORD environment variable. The cookie stores a hash of
 * the password (never the password itself), and the check runs on the
 * server — the password is not present in the client bundle.
 *
 * This is a simple shared secret for course materials, not account-level
 * security: anyone the password is shared with can open the modules.
 */

export const AUTH_COOKIE = "ecc-pocus-access";
export const ROLE_COOKIE = "ecc-pocus-role";

/** ~180 days, in seconds — faculty stay signed in for the academic year. */
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

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

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The value a valid auth cookie must hold. */
export async function getExpectedToken(): Promise<string> {
  return sha256Hex(`ecc-pocus:${getPassword()}`);
}

/** The value a valid editor-role cookie must hold. */
export async function getExpectedEditorToken(): Promise<string> {
  return sha256Hex(`ecc-pocus-editor:${getEditorPassword()}`);
}

export function verifyPassword(candidate: string): boolean {
  return candidate === getPassword();
}

export function verifyEditorPassword(candidate: string): boolean {
  return candidate === getEditorPassword();
}
