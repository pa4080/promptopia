// Ref.: https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextResponse } from "next/server";

// eslint-disable-next-line no-duplicate-imports
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// console.log(request);

	const path = request.url
		.replace(/https?:\/\/.*?\//, "")
		.split("?")[0]
		.split("/");

	// eslint-disable-next-line no-console
	console.log(`[middleware] path: ${path}`);

	const posts_cName = "articles";

	return NextResponse.redirect(
		new URL(`/posts${path.length > 1 && path[1] !== posts_cName ? `/${path[1]}` : ""}`, request.url)
	);
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/articles/:path*"],
};
