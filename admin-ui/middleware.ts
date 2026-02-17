// middleware.ts (Frontend - Next.js)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

  const url = req.nextUrl.clone();

  // -----------------------------
  // 🔐 Token Check (Auth Protection)
  // -----------------------------
  const token =
    req.cookies.get("nowex_admin_token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "") ||
    null;

  const protectedRoutes = ["/dashboard", "/mobile/dashboard"];

  const isProtected = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // اگر موبایل بود → mobile/login
    url.pathname = isMobile ? "/mobile/login" : "/login";
    return NextResponse.redirect(url);
  }

  // -----------------------------
  // 🔄 Device-based Routing
  // -----------------------------

  // 📌 مسیر اصلی
  if (url.pathname === "/") {
    url.pathname = isMobile ? "/mobile/login" : "/login";
    return NextResponse.redirect(url);
  }

  // 📌 موبایل همیشه روی /mobile/login بمونه
  if (isMobile && url.pathname === "/login") {
    url.pathname = "/mobile/login";
    return NextResponse.redirect(url);
  }

  // 📌 دسکتاپ همیشه روی /login بمونه
  if (!isMobile && url.pathname === "/mobile/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 📌 موبایل اگر روی /dashboard رفت → mobile/dashboard
  if (isMobile && url.pathname === "/dashboard") {
    url.pathname = "/mobile/dashboard";
    return NextResponse.redirect(url);
  }

  // 📌 دسکتاپ اگر روی /mobile/dashboard رفت → dashboard
  if (!isMobile && url.pathname === "/mobile/dashboard") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/mobile/login",
    "/dashboard",
    "/mobile/dashboard",
  ],
};
