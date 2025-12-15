import { NextRequest, NextResponse } from "next/server";

const MAINTENANCE = process.env.MAINTENANCE_MODE === "true";
const COMING_SOON = process.env.COMING_SOON === "true";

export async function proxy(request: NextRequest) {
  if (
    (!MAINTENANCE && /maintenance$/.test(request.nextUrl.pathname)) ||
    (!COMING_SOON && /coming-soon/.test(request.nextUrl.pathname))
  )
    return NextResponse.rewrite(new URL("/not-found", request.url));

  /*
   * controls the maintenance state
   */
  if (MAINTENANCE) {
    if (/images/.test(request.nextUrl.pathname)) return NextResponse.next();
    const maintenanceUrl = request.nextUrl.clone();
    maintenanceUrl.pathname = "/maintenance";
    return NextResponse.rewrite(maintenanceUrl);
  }

  if (COMING_SOON) {
    if (/images/.test(request.nextUrl.pathname)) return NextResponse.next();
    const commingSoonUrl = request.nextUrl.clone();
    commingSoonUrl.pathname = "/coming-soon";
    return NextResponse.rewrite(commingSoonUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
