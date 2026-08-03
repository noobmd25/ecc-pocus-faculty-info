import { NextResponse, type NextRequest } from "next/server";
import {
  AUTH_COOKIE,
  ROLE_COOKIE,
  getExpectedEditorToken,
  getExpectedToken,
} from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const toGate = () => {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  };

  const viewerToken = request.cookies.get(AUTH_COOKIE)?.value;
  if (viewerToken !== (await getExpectedToken())) return toGate();

  if (request.nextUrl.pathname.startsWith("/editor")) {
    const roleToken = request.cookies.get(ROLE_COOKIE)?.value;
    if (roleToken !== (await getExpectedEditorToken())) return toGate();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/modules/:path*", "/editor/:path*"],
};
