import { type NextRequest, NextResponse } from "next/server";

const redirectToFeed = [
  "/login", "/cadastro", "/recuperar-senha",
  "/onboarding", "/completar-perfil",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldRedirect = redirectToFeed.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  if (shouldRedirect) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
