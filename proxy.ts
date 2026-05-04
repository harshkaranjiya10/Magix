import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  matcher: [
    "/dashboard/:path*", // protect dashboard
    "/login",            // control login redirect
  ],
};

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  /* console.log("PATH:", req.nextUrl.pathname);
  console.log("TOKEN:", token); // 👈 IMPORTANT */

  // protect dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}