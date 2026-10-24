import fs from "fs/promises";
import path from "path";

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

export async function readContent(name) {
  if (!isValidCollection(name)) throw new Error(`Unknown collection: ${name}`);
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${name}.json`), "utf-8");
  return JSON.parse(raw);
}

export async function writeContent(name, data) {
  if (!isValidCollection(name)) throw new Error(`Unknown collection: ${name}`);
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
