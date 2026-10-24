import fs from "fs/promises";
import path from "path";
import { githubEnabled, readRepoFile, writeRepoFile } from "./github";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Only these files can ever be read or written — keeps the admin API safe.
export const COLLECTIONS = [
  "site",
  "projects",
  "research",
  "journal",
  "life",
  "locations",
  "messages",
];

export function isValidCollection(name) {
  return COLLECTIONS.includes(name);
}

// `fresh` reads the latest saved version from GitHub instead of the copy
// bundled with the current deploy — the admin needs it so a second edit made
// before the rebuild finishes doesn't undo the first.
export async function readContent(name, { fresh = false } = {}) {
  if (!isValidCollection(name)) throw new Error(`Unknown collection: ${name}`);
  if (fresh && githubEnabled()) {
    const file = await readRepoFile(`content/${name}.json`);
    if (file) return JSON.parse(file.data.toString("utf-8"));
  }
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${name}.json`), "utf-8");
  return JSON.parse(raw);
}

export async function writeContent(name, data) {
  if (!isValidCollection(name)) throw new Error(`Unknown collection: ${name}`);
  if (githubEnabled()) {
    // Messages never appear on the public site, so don't rebuild for them.
    const message = name === "messages"
      ? "Update messages [skip deploy]"
      : `Update ${name} from admin dashboard`;
    await writeRepoFile(`content/${name}.json`, JSON.stringify(data, null, 2), message);
    return;
  }
  const file = path.join(CONTENT_DIR, `${name}.json`);
  // Keep one backup of the previous version so a bad save is never fatal.
  try {
    const prev = await fs.readFile(file, "utf-8");
    await fs.writeFile(file + ".bak", prev, "utf-8");
  } catch {}
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSite() {
  return readContent("site");
}

export async function getProjects() {
  return (await readContent("projects")).items || [];
}

export async function getProject(slug) {
  return (await getProjects()).find((p) => p.slug === slug) || null;
}

export async function getJournal() {
  const items = (await readContent("journal")).items || [];
  return items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function getPost(slug) {
  return (await getJournal()).find((p) => p.slug === slug) || null;
}

export async function getResearch() {
  return (await readContent("research")).items || [];
}

export async function getLife() {
  return (await readContent("life")).items || [];
}

export async function getLocations() {
  return (await readContent("locations")).items || [];
}
