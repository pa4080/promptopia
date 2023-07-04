// https://next-auth.js.org/getting-started/typescript#module-augmentation
import NextAuth, { DefaultSession, Profile as DefaultProfile } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string;
			accountProvider: string;
			description?: string;
			username?: string;
		} & DefaultSession["user"];
	}

	interface Profile extends DefaultProfile {
		picture?: string;
		avatar_url?: string;
		login?: string;
		username?: string;
		email_verified?: boolean;
	}
}
