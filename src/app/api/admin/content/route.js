import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { readContent, writeContent, isValidCollection } from "@/lib/content";

export async function GET(req) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const file = new URL(req.url).searchParams.get("file");
  if (!isValidCollection(file)) {
    return NextResponse.json({ error: "Unknown collection." }, { status: 400 });
  }
  return NextResponse.json(await readContent(file));
}

export async function PUT(req) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const { file, data } = await req.json();
  if (!isValidCollection(file)) {
    return NextResponse.json({ error: "Unknown collection." }, { status: 400 });
  }
  if (typeof data !== "object" || data === null) {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }
  await writeContent(file, data);
  return NextResponse.json({ ok: true });
}
