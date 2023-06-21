// https://next-auth.js.org/getting-started/typescript#module-augmentation
import NextAuth, { DefaultSession, Profile as DefaultProfile } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			id: string;
		} & DefaultSession["user"];
	}

	interface Profile extends DefaultProfile {
		picture: string;
	}
}
