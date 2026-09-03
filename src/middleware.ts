import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, ROLE_COOKIE, resolveRole, safeNextPath } from "@/lib/auth";
import { sanityEnabled, studioUrl } from "@/sanity/env";

/** /modules/<course>/<module>/teacher — the faculty-only page. */
const TEACHER_PAGE = /^\/modules\/([^/]+)\/([^/]+)\/teacher\/?$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const toGate = () => {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    // Remember where the visitor was heading (a module link from Canvas,
    // say) so the gate can send them straight there after they sign in.
    const next = safeNextPath(pathname);
    if (next && next !== "/modules") url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  };

  const role = await resolveRole(
    request.cookies.get(AUTH_COOKIE)?.value,
    request.cookies.get(ROLE_COOKIE)?.value,
  );
  if (!role) return toGate();

  // Learners only get the student side of a module: a teacher URL quietly
  // opens the student version instead.
  if (role === "learner") {
    const teacher = pathname.match(TEACHER_PAGE);
    if (teacher) {
      const url = request.nextUrl.clone();
      url.pathname = `/modules/${teacher[1]}/${teacher[2]}/student`;
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/editor")) {
    if (role !== "editor") return toGate();

    // Once content comes from Sanity, the git-backed editor writes files
    // nothing reads any more — send editors to the Studio instead.
    if (sanityEnabled) {
      if (studioUrl) return NextResponse.redirect(new URL(studioUrl));
      const url = request.nextUrl.clone();
      url.pathname = "/modules";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/modules/:path*", "/editor/:path*"],
};
