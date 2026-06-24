import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyCookie } from "@/lib/admin/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Auth endpoints are always accessible
  if (pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // Protect /admin/* and /api/admin/leads/*
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    // Login page itself is always accessible
    if (pathname === "/admin/login") return NextResponse.next();

    const cookieValue = req.cookies.get(ADMIN_COOKIE)?.value;

    if (!cookieValue || !(await verifyCookie(cookieValue))) {
      if (isAdminApi) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", req.url);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(ADMIN_COOKIE);
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
