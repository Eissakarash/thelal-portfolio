import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  authRoutes,
  DEFAULT_LOGIN_PAGE,
  DEFAULT_LOGIN_REDIRECT,
} from "./auth/routes";
import { locales } from "./i18n";
import { localePrefix } from "./utils/navigation";

// This middleware doesn't use the auth() wrapper
export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Get session manually instead of using auth() wrapper
  const authCookie =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLogin = !!authCookie;
  const lang = nextUrl.pathname.split("/")[1];

  // Create a new headers object
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url-lang", lang);

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: "ar",
    localePrefix,
    locales,
    alternateLinks: false,
  });

  const baseUrl = nextUrl.pathname.replace("/en", "");

  const isProtectedRoute = /^\/dashboard(?:\/|$)/.test(baseUrl);

  const isAuthRoute = authRoutes.includes(baseUrl);

  const response = handleI18nRouting(request);

  if (isAuthRoute) {
    if (isLogin) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
      );
    }
    return response;
  }

  if (!isLogin && isProtectedRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_PAGE, nextUrl.origin));
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
