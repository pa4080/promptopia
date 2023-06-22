// Ref.: https://youtu.be/wm5gMKuwSYk?t=4860
// https://next-auth.js.org/getting-started/example
// https://next-auth.js.org/getting-started/typescript
// https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/

import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth-options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
