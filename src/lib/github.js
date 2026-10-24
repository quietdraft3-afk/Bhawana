// Stores files in the site's GitHub repo. Hosts like Vercel have no writable
// disk, so the admin dashboard commits its changes here instead; each commit
// makes Vercel rebuild the site, and the change goes live about a minute later.

const API = "https://api.github.com";

export function githubEnabled() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

function branch() {
  return process.env.GITHUB_BRANCH || "main";
}

function request(repoPath, { accept = "application/vnd.github.object", ...init } = {}) {
  return fetch(`${API}/repos/${process.env.GITHUB_REPO}/contents/${repoPath}?ref=${branch()}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: accept,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}

// Returns { sha, data } or null if the file doesn't exist.
export async function readRepoFile(repoPath) {
  const res = await request(repoPath);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Could not read ${repoPath} from GitHub (${res.status}).`);
  const body = await res.json();
  let data = Buffer.from(body.content || "", "base64");
  // GitHub leaves `content` empty for files over 1 MB; fetch those raw.
  if (!body.content && body.size > 0) {
    const raw = await request(repoPath, { accept: "application/vnd.github.raw" });
    if (!raw.ok) throw new Error(`Could not read ${repoPath} from GitHub (${raw.status}).`);
    data = Buffer.from(await raw.arrayBuffer());
  }
  return { sha: body.sha, data };
}

// A commit message containing "[skip deploy]" doesn't rebuild the site (see vercel.json).
export async function writeRepoFile(repoPath, data, message) {
  const current = await readRepoFile(repoPath);
  const res = await request(repoPath, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(data).toString("base64"),
      branch: branch(),
      ...(current && { sha: current.sha }),
    }),
  });
  if (res.status === 409) {
    throw new Error("Another save happened at the same moment. Please reload the page and try again.");
  }
  if (!res.ok) throw new Error(`Could not save ${repoPath} to GitHub (${res.status}).`);
}
