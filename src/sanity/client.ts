import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

let client: SanityClient | null = null;

/**
 * Read-only client for published content, created lazily so this module
 * can be imported while no Sanity project is connected yet. Only call it
 * when sanityEnabled is true. Reads go through Sanity's CDN; freshness
 * is handled by the revalidate window on each fetch.
 */
export function getSanityClient(): SanityClient {
  client ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return client;
}
