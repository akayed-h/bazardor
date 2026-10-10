import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic check (cookie only). Pages re-validate the session on the server.
export function middleware(request) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const url = new URL("/signin", request.url);
    url.searchParams.set(
      "redirect",
      request.nextUrl.pathname + request.nextUrl.search
    );
    url.searchParams.set("reason", "protected");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
