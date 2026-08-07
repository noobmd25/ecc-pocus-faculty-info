import "server-only";
import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

let client: SanityClient | null = null;

/**
 * Read token for the private dataset (sanity.io/manage → API → Tokens,
 * Viewer permission). Server-only: it is deliberately not a NEXT_PUBLIC_
 * variable, and the `server-only` import above makes importing this
 * module from a client component a build error rather than a leak.
 *
 * Left unset the client still works against a public dataset, so the
 * site keeps running if the dataset visibility is ever flipped back.
 */
const readToken = process.env.SANITY_API_READ_TOKEN;

/**
 * Read-only client for published content, created lazily so this module
 * can be imported while no Sanity project is connected yet. Only call it
 * when sanityEnabled is true. Reads go through Sanity's CDN (which
 * serves authenticated requests too); freshness is handled by the
 * revalidate window on each fetch.
 */
export function getSanityClient(): SanityClient {
  client ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
    ...(readToken ? { token: readToken } : {}),
  });
  return client;
}
