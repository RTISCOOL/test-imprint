import { NextResponse, type NextRequest } from "next/server"

import { getSessionUser } from "./lib/api/apiutil"

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()

  const user = await getSessionUser()

  // if on dashboard and not logged in, redirect to login
  if (!user && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/register", req.url))
  }

  // if on login or signup and logged in, redirect to platform
  if (user && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/platform", req.url))
  }

  return res
}

export const config = {
  matcher: ["/platform/:path*", "/auth/:path*"],
}
