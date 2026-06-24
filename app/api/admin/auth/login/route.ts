import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  COOKIE_MAX_AGE,
  computeSessionToken,
  verifyPassword,
} from "@/lib/admin/session";

const LoginSchema = z.object({
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Contraseña requerida" }, { status: 400 });
  }

  const valid = await verifyPassword(parsed.data.password);

  if (!valid) {
    // Small delay to slow brute force (non-blocking for legit use)
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const sessionToken = await computeSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return res;
}
