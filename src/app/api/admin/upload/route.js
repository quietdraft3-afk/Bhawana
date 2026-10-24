import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isLoggedIn } from "@/lib/auth";
import { githubEnabled, writeRepoFile } from "@/lib/github";

const ALLOWED = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
};
const MAX_BYTES = 4 * 1024 * 1024; // Vercel rejects request bodies over 4.5 MB

export async function POST(req) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP, GIF, SVG or PDF files are allowed." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File is too large (max 4 MB). Please resize the image and try again." },
      { status: 400 }
    );
  }
  const base = (file.name || "upload")
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60) || "upload";
  const name = `${base}-${Date.now()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  if (githubEnabled()) {
    // No rebuild yet: src/app/uploads serves it from GitHub until the next
    // content save rebuilds the site with the file included.
    try {
      await writeRepoFile(`uploads/${name}`, bytes, `Upload ${name} [skip deploy]`);
    } catch (e) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, path: `/uploads/${name}` });
  }
  // Stored outside public/ because Next.js only serves public/ files that
  // existed at build time; /uploads/* is served by src/app/uploads instead.
  const dir = path.join(process.cwd(), "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);
  return NextResponse.json({ ok: true, path: `/uploads/${name}` });
}
