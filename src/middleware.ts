import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, getExpectedToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (token !== (await getExpectedToken())) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/modules/:path*"],
};
