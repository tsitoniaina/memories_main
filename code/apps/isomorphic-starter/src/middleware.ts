import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, routes } from "@/config/routes.ts";
import { getToken } from "next-auth/jwt";
const languages: string[] = Object.values(routes.languages.lang);

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  const [, lang, ...routePath] = pathname.split("/");
  const currentPath = routePath.join("/");
  const isExcludedPath =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/trpc") ||
    pathname.startsWith(routes.success_registration);

  if (!languages.includes(lang) && !isExcludedPath) {
    const [_, queries] = req.url.split("?");
    const url = new URL(
      `/${routes.languages.fallback}/${currentPath}${queries ? `?${queries}` : ""}`,
      req.url,
    );
    return NextResponse.redirect(url);
  }

  if (token && routePath.length === 0) {
    return NextResponse.redirect(
      new URL(`/${lang}/${routes.dashboard}`, req.url),
    );
  }

  if (!token && protectedRoutes.includes(`/${currentPath}`)) {
    return NextResponse.redirect(new URL(`/${lang}${routes.signIn}`, req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!favicon\\.ico$|.+\\.[\\w]+$|_next).*)",
    `^${routes.signIn}$`,
    "/(api|trpc)(.*)",
  ],
};
