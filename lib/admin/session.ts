/**
 * Edge-compatible (Web Crypto API only) session utilities for the admin panel.
 * Importable from both middleware (Edge Runtime) and API routes (Node.js).
 */

export const ADMIN_COOKIE = "admin_sid";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Derives a deterministic, non-reversible session token from env vars.
// Changing ADMIN_TOKEN or ADMIN_SESSION_SECRET invalidates all sessions.
export async function computeSessionToken(): Promise<string> {
  const token = process.env.ADMIN_TOKEN ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  if (!token || !secret) return "";

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode("maxifletes:admin-session:v1:" + token)
  );
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Constant-time comparison to prevent timing attacks.
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// Verifies a submitted password against ADMIN_TOKEN using timing-safe HMAC.
export async function verifyPassword(submitted: string): Promise<boolean> {
  const expected = process.env.ADMIN_TOKEN ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  if (!expected || !secret) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.sign("HMAC", key, enc.encode(submitted)),
    crypto.subtle.sign("HMAC", key, enc.encode(expected)),
  ]);
  const a = new Uint8Array(hashA);
  const b = new Uint8Array(hashB);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// Verifies a cookie value against the expected session token.
export async function verifyCookie(cookieValue: string): Promise<boolean> {
  const expected = await computeSessionToken();
  if (!expected) return false;
  return safeCompare(cookieValue, expected);
}
