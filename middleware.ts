/*import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/files");

  if (!token && isProtectedRoute) {
    // User is not logged in and trying to access a protected route
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
      return NextResponse.next(); // token is valid, allow access
    } catch {
      // Token is invalid or expired
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next(); // public route
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/files/:path*"],
};
*/

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/profile") || 
    pathname.startsWith("/files");

  if (!token && isProtectedRoute) {
    // Store the attempted URL for redirect after login
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/files/:path*"],
};