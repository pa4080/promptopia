/**
 * This file comes from:
 * > [Next.js 13 Full Course 2023 Tutorial](@see https://youtu.be/wm5gMKuwSYk?t=5190)
 *
 * See also ./mongodb-nextjs-example.ts for more details, where is used
 * the approach provided by Next.js/Vercel... and deploying .env file.
 *
 * In the tutorial is used some deprecated options, read more here:
 * > @see https://mongoosejs.com/docs/5.x/docs/deprecations.html
 *
 * @see https://hevodata.com/learn/mongoose-gridfs/
 * @see https://stackoverflow.com/questions/57614296/how-to-create-mongoose-model-for-gridfs-collection
 */

import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_FILES_BUCKET_NAME = process.env.MONGODB_FILES_BUCKET_NAME;

let isConnected = false; // track the connection status
let bucket: mongoose.mongo.GridFSBucket | null = null;

export const connectToMongoDb = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		return;
	}

	try {
		await mongoose.connect(MONGODB_URI, {
			dbName: MONGODB_DB_NAME,
		});

		isConnected = true;
	} catch (error) {
		console.error("MongoDB connect Error:", error);
	}
};

export const gridFSBucket = async () => {
	await connectToMongoDb();

	bucket =
		bucket ||
		new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
			bucketName: MONGODB_FILES_BUCKET_NAME,
		}); // mongoose.connection === mongoose.connections[0]

	return bucket;
};
