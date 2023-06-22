/**
 * https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
 * https://next-auth.js.org/configuration/nextjs#getServerSession
 * https://next-auth.js.org/getting-started/client#usesession
 *
 * There are three locations where we can obtain the session data.
 * 1) The first is server-side in a React server component
 * 2) the second is also server-side in any API route,
 * 3) and the last is on the client-side.
 *
 * This file is used in:
 * > app/api/auth/[...nextauth]/route.ts
 * > app/api/session/route.ts [example for: Get the Session in an API Route]
 * > app/[locale]/layout.tsx [example for: Get the Session in a Server Component]
 *
 * [example for: Get the Session in a Client Component by useSession()]: /app/[locale]/components/Nav.tsx
 */

import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

import { connectMongoDb } from "@/lib/mongodb-mongoose-connect";

import User from "@/models/user";

import type { NextAuthOptions } from "next-auth";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
// console.log({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET });

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: String(GOOGLE_CLIENT_ID),
			clientSecret: String(GOOGLE_CLIENT_SECRET),
		}),
	],
	callbacks: {
		// https://next-auth.js.org/configuration/options#session
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session?.user?.email });

			session.user.id = sessionUser?._id.toString(); // see: @/types/next-auth

			return session; // The return type will match the one returned in `useSession()`
		},
		async signIn({ profile }) {
			try {
				await connectMongoDb();

				// Check if the user already exists in the database
				const userExist = await User.findOne({ email: profile?.email });

				// NOTE:
				// .picture does not exist on {session}
				// .image does not exist on {profile}
				// at all they are the same thing ..?!? see also <Nav />
				// console.log(profile);

				// If not create a new user in the database
				if (!userExist) {
					await User.create({
						email: profile?.email,
						username: profile?.name?.replace(/\s/g, "").toLocaleLowerCase(),
						name: profile?.name,
						image: profile?.picture,
					});
				}

				return true;
			} catch (error) {
				console.error(error);

				return false;
			}
		},
	},
};
