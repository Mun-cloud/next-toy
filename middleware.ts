import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrl: Routes = {
  "/": true,
  "/summary/login": true,
  "/summary/signup": true,
};

const notOnlyUrl: Routes = {
  "/summary": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  const isPublicOnlyUrl = publicOnlyUrl[pathname];
  const isNotOnly = notOnlyUrl[pathname];

  if (!session.id) {
    if (!isPublicOnlyUrl && !isNotOnly) {
      return NextResponse.redirect(new URL("/summary/login", request.url));
    }
  } else {
    if (isPublicOnlyUrl && !isNotOnly) {
      return NextResponse.redirect(new URL("/summary", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico).*)"],
};
