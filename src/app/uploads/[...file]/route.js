import fs from "fs/promises";
import path from "path";
import { githubEnabled, readRepoFile } from "@/lib/github";

const TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

// Serves files uploaded through the admin dashboard (stored in /uploads,
// outside public/, so they work without rebuilding the site).
export async function GET(req, { params }) {
  const { file } = await params;
  const name = (file || []).join("/");
  const dir = path.join(process.cwd(), "uploads");
  const full = path.normalize(path.join(dir, name));
  if (!full.startsWith(dir)) {
    return new Response("Not found", { status: 404 });
  }
  const ext = path.extname(full).toLowerCase();
  const type = TYPES[ext];
  if (!type) return new Response("Not found", { status: 404 });
  let data;
  try {
    data = await fs.readFile(full);
  } catch {
    // Uploaded since the last deploy — fetch it from the repo instead.
    if (githubEnabled()) {
      data = (await readRepoFile(`uploads/${path.relative(dir, full).replace(/\\/g, "/")}`).catch(() => null))?.data;
    }
  }
  if (!data) return new Response("Not found", { status: 404 });
  return new Response(data, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
