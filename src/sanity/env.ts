/**
 * Sanity connection settings for the site.
 *
 * The site runs in two modes:
 *  - No NEXT_PUBLIC_SANITY_PROJECT_ID set → content is read from the
 *    markdown files in src/content (the original git-backed setup).
 *  - Project ID set → content is read from Sanity, and editing happens
 *    in the standalone Studio (studio-ecc-pocus-faculty-info/).
 *
 * The Studio itself has its own config in
 * studio-ecc-pocus-faculty-info/sanity.config.ts.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Hard-coded per Sanity guidance; bump deliberately when adopting newer API behavior. */
export const apiVersion = "2026-08-05";

/** True once the Sanity project is connected. */
export const sanityEnabled = projectId.length > 0;

/**
 * Where the deployed Studio lives (e.g. https://….sanity.studio or
 * http://localhost:3333 in dev). Editor-mode buttons deep-link into it;
 * they're hidden while this is unset.
 */
export const studioUrl = (
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? ""
).replace(/\/+$/, "");
