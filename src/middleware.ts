import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {}

export const config = {
  matcher: "/product/:path*",
};
