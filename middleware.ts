import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers for all routes
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  // Do NOT set a restrictive frame-ancestors CSP directive —
  // the app uses iframes internally and this would break it.

  return response;
}

export const config = {
  matcher: [
    // Match all request paths except for static files.
    "/((?!_next/static|_next/image|favicon.ico|manifest.json).*)",
  ],
};
