/**
 * https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
 * https://next-auth.js.org/configuration/nextjs#getServerSession
 * https://next-auth.js.org/getting-started/client#usesession
 * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
 * https://developers.google.com/identity/protocols/oauth2
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
import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials"; // For DB auth...

import { getTranslations } from "next-intl/server";

import { connectToMongoDb } from "@/lib/mongodb-mongoose";

import User from "@/models/user";

import type { NextAuthOptions } from "next-auth";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } =
	process.env;

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: String(GOOGLE_CLIENT_ID),
			clientSecret: String(GOOGLE_CLIENT_SECRET),
		}),
		GithubProvider({
			clientId: String(GITHUB_CLIENT_ID),
			clientSecret: String(GITHUB_CLIENT_SECRET),
			authorization: { params: { scope: "user:email login name avatar_url" } },
		}),
	],
	callbacks: {
		// https://next-auth.js.org/configuration/options#session
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session?.user?.email });

			session.user.id = sessionUser?._id.toString(); // see: @/types/next-auth
			session.user.accountProvider = sessionUser?.accountProvider;
			session.user.username = sessionUser?.username;
			session.user.description = sessionUser?.description;

			return session; // The return type will match the one returned in `useSession()`
		},
		async signIn({ account, profile }) {
			// console.log(profile, account);

			// https://next-auth.js.org/providers/google
			if (account?.provider === "google" && !profile?.email_verified) {
				return false;
			}

			try {
				await connectToMongoDb();

				// Check if the user already exists in the database
				const userExist = await User.findOne({ email: profile?.email });

				/**
				 * NOTE: .picture does not exist on { session } depending on the provider
				 * .image does not exist on { profile } - i.e. for GitHub 'avatar_url'...
				 * @see '@/app/components/Nav.tsx' and '@/types/next-auth.d.ts'
				 */

				// If not create a new user in the database
				if (!userExist) {
					const name = String(profile?.name ?? profile?.login ?? profile?.username);

					await User.create({
						email: String(profile?.email),
						username: String(
							`${profile?.email}${Math.floor(Math.random() * 10000)}${account?.provider}`
								?.replace(/(\s|\.|-|@)/g, ".")
								.replace(/\.+/g, "")
								.toLocaleLowerCase()
								.replace(/[^a-z0-9]/gi, "")
						),
						name,
						image: String(profile?.picture ?? profile?.image ?? profile?.avatar_url),
						accountProvider: String(account?.provider),
						description: (await getTranslations("Common"))("defaultUserDescription"),
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
