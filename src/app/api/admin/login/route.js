import { NextResponse } from "next/server";
import { sessionCookie } from "@/lib/auth";

export async function POST(req) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }
  if (password !== expected) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie());
  return res;
}
