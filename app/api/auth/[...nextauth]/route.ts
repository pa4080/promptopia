/**
 * @see [Promptopia] Next.js 13 Full Course 2023 @see https://youtu.be/wm5gMKuwSYk?t=4860
 * @see [Next-Auth] Tutorial with Next.js 13 @see https://youtu.be/w2h54xz6Ndw
 * @see https://next-auth.js.org/getting-started/example
 * @see https://next-auth.js.org/getting-started/typescript
 * @see https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
 * @use "openssl rand -base64 32" to generate a NEXTAUTH_SECRET
 */

import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth-options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
