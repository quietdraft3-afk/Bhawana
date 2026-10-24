import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "bhawana_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // one week

function secret() {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
}

function sign(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createToken() {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, exp, sig] = parts;
  const payload = `${role}.${exp}`;
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return role === "admin" && Number(exp) > Date.now();
}

export async function isLoggedIn() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

export function sessionCookie() {
  return {
    name: COOKIE,
    value: createToken(),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  };
}

export const COOKIE_NAME = COOKIE;
