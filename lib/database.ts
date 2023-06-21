/**
 * This file comes from:
 * > [Next.js 13 Full Course 2023 Tutorial](https://youtu.be/wm5gMKuwSYk?t=5190)
 *
 * See also ./mongodb.ts for more details, where is used the approach provided by Vercel:
 *  npx create-next-app@latest --example with-mongodb
 *
 * In the tutorial is used some deprecated options, read more here:
 * > https://mongoosejs.com/docs/5.x/docs/deprecations.html
 */

import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let isConnected = false; // track the connection status

export const connectMongoDb = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		// eslint-disable-next-line no-console
		console.log("MongoDB is already connected.");

		return;
	}

	try {
		await mongoose.connect(uri, {
			dbName: dbName,
		});

		isConnected = true;

		// eslint-disable-next-line no-console
		console.log("MongoDB connected!");
	} catch (error) {
		console.error("MongoDB connect Error:", error);
	}
};
