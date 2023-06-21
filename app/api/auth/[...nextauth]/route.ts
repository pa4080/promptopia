// Ref.: https://youtu.be/wm5gMKuwSYk?t=4860
// https://next-auth.js.org/getting-started/example
// https://next-auth.js.org/getting-started/typescript

import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import { connectMongoDb } from "@/lib/database";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// console.log({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET });

const handler = NextAuth({
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
});

export { handler as GET, handler as POST };
