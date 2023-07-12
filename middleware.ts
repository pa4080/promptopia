/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://github.com/pillarjs/path-to-regexp#path-to-regexp-1
 * @see https://next-intl-docs.vercel.app/docs/routing/middleware#example-auth-js
 */

import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextRequest } from "next/server";

const locales = ["en"]; // ["en", "bg"];
const publicPages = [
	"/",
	"/login",
	"/user-posts",
	"/privacy-policy",
	"/cookies-consent",
	"/terms-of-use",
];

const intlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale: "en",
});

type AuthMiddleware = (
	request: NextRequestWithAuth | NextRequest,
	event?: NextFetchEvent
) => Promise<NextMiddlewareResult>;

const authMiddleware = withAuth(
	// Note that this callback is only invoked if
	// the `authorized` callback has returned `true`
	// and not for pages listed in `pages`.
	function onSuccess(req) {
		return intlMiddleware(req);
	},
	{
		callbacks: {
			authorized: ({ token }) => token != null,
		},
		pages: {
			// signIn: "/login",
			signIn: "/api/auth/signin",
		},
	}
) as AuthMiddleware;

export default function middleware(req: NextRequest) {
	const publicPathnameRegex = RegExp(
		`^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
		"i"
	);
	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

	if (isPublicPage) {
		return intlMiddleware(req);
	} else {
		return authMiddleware(req);
	}
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
