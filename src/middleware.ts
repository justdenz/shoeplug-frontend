import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request);
}

// export const config = {
//   matcher: "/product",
// };
