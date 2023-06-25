/**
 * This file comes from:
 * > [Next.js 13 Full Course 2023 Tutorial](https://youtu.be/wm5gMKuwSYk?t=5190)
 *
 * See also ./mongodb-nextjs-example.ts for more details, where is used
 * the approach provided by Next.js/Vercel... and deploying .env file.
 *
 * In the tutorial is used some deprecated options, read more here:
 * > https://mongoosejs.com/docs/5.x/docs/deprecations.html
 */

import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

let isConnected = false; // track the connection status

export const connectMongoDb = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		// eslint-disable-next-line no-console
		// console.log("MongoDB is already connected.");
		return;
	}

	try {
		await mongoose.connect(MONGODB_URI, {
			dbName: MONGODB_DB_NAME,
		});

		isConnected = true;

		// eslint-disable-next-line no-console
		// console.log("MongoDB connected!");
	} catch (error) {
		console.error("MongoDB connect Error:", error);
	}
};
