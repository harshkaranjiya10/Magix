import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

export const config = {
  matcher: [
    "/dashboard/:path*", // protect dashboard
    "/login", // control login redirect
  ],
}

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  // protect dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  if (req.nextUrl.pathname === "/login" && token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
      return NextResponse.redirect(new URL("/dashboard", req.url))
    } catch {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}
