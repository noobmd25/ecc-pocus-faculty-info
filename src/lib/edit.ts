import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ModuleDoc } from "./content";

/**
 * Persists an edited module document.
 *
 * - With GITHUB_TOKEN set (the deployed site): commits the change to the
 *   GitHub repository via the Contents API. The hosting platform's Git
 *   integration then rebuilds and publishes — edits go live after the
 *   rebuild (~1–2 minutes) and every save is a revertable commit.
 * - Without it (local development / self-hosted): writes the file in
 *   place, so the change is visible on the next request.
 *
 * Env vars: GITHUB_TOKEN (fine-grained PAT, Contents read/write on this
 * repo), GITHUB_REPO ("owner/repo"), GITHUB_BRANCH.
 */

const GITHUB_API = "https://api.github.com";

function repoConfig() {
  return {
    token: process.env.GITHUB_TOKEN,
    repo: process.env.GITHUB_REPO ?? "noobmd25/ecc-pocus-faculty-info",
    // On Vercel, commit to the branch this deployment was built from so
    // saves trigger a rebuild of the same site.
    branch:
      process.env.GITHUB_BRANCH ?? process.env.VERCEL_GIT_COMMIT_REF ?? "main",
  };
}

export type PersistResult = { mode: "github" | "local" };

export async function persistModuleDoc(
  courseSlug: string,
  moduleSlug: string,
  doc: ModuleDoc,
  content: string,
): Promise<PersistResult> {
  return persistFile(`src/content/${courseSlug}/${moduleSlug}/${doc}.md`, content);
}

export async function persistFile(
  relPath: string,
  content: string,
): Promise<PersistResult> {
  const { token, repo, branch } = repoConfig();

  if (!token) {
    const abs = path.join(process.cwd(), relPath);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, content, "utf8");
    return { mode: "local" };
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const url = `${GITHUB_API}/repos/${repo}/contents/${relPath}`;

  // Current blob SHA is required to update an existing file.
  let sha: string | undefined;
  const current = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, {
    headers,
    cache: "no-store",
  });
  if (current.ok) {
    sha = ((await current.json()) as { sha?: string }).sha;
  } else if (current.status !== 404) {
    throw new Error(`Could not read the current file from GitHub (HTTP ${current.status}).`);
  }

  const put = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `Edit ${relPath} via web editor`,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (put.status === 409) {
    throw new Error(
      "Someone else saved this page while you were editing. Copy your text, reload the editor, and paste it back in.",
    );
  }
  if (!put.ok) {
    throw new Error(`GitHub rejected the save (HTTP ${put.status}). Check the GITHUB_TOKEN configuration.`);
  }

  return { mode: "github" };
}
