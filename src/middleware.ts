import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/%E2%81%A9",
};
