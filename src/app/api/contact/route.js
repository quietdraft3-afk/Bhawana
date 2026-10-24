import { NextResponse } from "next/server";
import { readContent, writeContent } from "@/lib/content";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || "").slice(0, 120).trim();
    const email = String(body.email || "").slice(0, 200).trim();
    const message = String(body.message || "").slice(0, 4000).trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const data = await readContent("messages");
    data.items = data.items || [];
    data.items.unshift({
      name,
      email,
      message,
      date: new Date().toISOString(),
      read: false,
    });
    // Keep the inbox from growing without bound.
    data.items = data.items.slice(0, 500);
    await writeContent("messages", data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Could not save message." }, { status: 500 });
  }
}
