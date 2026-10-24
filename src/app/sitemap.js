import { getProjects, getJournal } from "@/lib/content";

const BASE = process.env.SITE_URL || "https://bhawanaaryal.com.np";

export default async function sitemap() {
  const [projects, posts] = await Promise.all([getProjects(), getJournal()]);
  const staticPages = ["", "/about", "/projects", "/research", "/journal", "/life", "/map", "/connect"].map(
    (p) => ({ url: `${BASE}${p}`, lastModified: new Date() })
  );
  return [
    ...staticPages,
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}`, lastModified: new Date() })),
    ...posts.map((p) => ({ url: `${BASE}/journal/${p.slug}`, lastModified: new Date() })),
  ];
}
