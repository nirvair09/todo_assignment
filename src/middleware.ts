import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  
  // If the requested path is "/usertask" and there's no token, redirect to login
  if (path === "/usertask" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If the requested path is "/usertask" and there's a token, allow the request to continue
  if (path === "/usertask" && token) {
    return;
  }
}
