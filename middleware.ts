import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  authRoutes,
  DEFAULT_LOGIN_PAGE,
  DEFAULT_LOGIN_REDIRECT,
} from "./auth/routes";
import { locales } from "./i18n";
import { localePrefix } from "./utils/navigation";

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const authCookie =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLogin = !!authCookie;
  const lang = nextUrl.pathname.split("/")[1];

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: "ar",
    localePrefix,
    locales,
    alternateLinks: false,
  });

  const baseUrl = nextUrl.pathname.replace(/^\/(en|ar)/, "") || "/";
  const isProtectedRoute = /^\/dashboard(?:\/|$)/.test(baseUrl);
  const isAuthRoute = authRoutes.includes(baseUrl);

  const response = handleI18nRouting(request);

  if (isAuthRoute) {
    if (isLogin) {
      return NextResponse.redirect(
        new URL(`/en${DEFAULT_LOGIN_REDIRECT}`, nextUrl.origin)
      );
    }
    return response;
  }

  if (!isLogin && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/en${DEFAULT_LOGIN_PAGE}`, nextUrl.origin)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
