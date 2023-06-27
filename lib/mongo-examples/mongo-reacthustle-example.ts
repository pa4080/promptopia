/**
 * @see [The_commit_where__it_is_used](https://github.com/metalevel-tech/exc-nextjs-2023-shared-prompts/commit/9758814a477f14a048f20dc20c74ce3d80a2e003)
 *
 * @see https://reacthustle.com/blog/how-to-upload-retrieve-images-to-mongodb-using-nextjs-13-app-router
 * @see https://www.mongodb.com/docs/manual/core/gridfs/
 * @see /app/api/files/route.ts
 * @see /app/api/files/[filename]/route.ts
 * @see /app/[locale]/create-post/page.tsx
 * @see /app/components/Form.tsx
 */
import { MongoClient, GridFSBucket, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

declare global {
	// eslint-disable-next-line no-var
	var client: MongoClient | null;
	// eslint-disable-next-line no-var
	var bucket: GridFSBucket | null;
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_OPTIONS: MongoClientOptions = {};
const MONGODB_FILES_BUCKET_NAME = process.env.MONGODB_FILES_BUCKET_NAME;
// rename it fo "grid_fs" so the resultant collections will be: 'grid_fs.files' and 'grid_fs.chunks'

/**
 * Initializes the connection to mongodb and creates a GridFSBucket
 * Once connected, it will use the cached connection.
 */
export async function connectToDb() {
	if (global.client) {
		return {
			client: global.client,
			bucket: global.bucket!,
		};
	}

	const client = (global.client = new MongoClient(MONGODB_URI, MONGODB_OPTIONS));
	const bucket = (global.bucket = new GridFSBucket(client.db(MONGODB_DB_NAME), {
		bucketName: MONGODB_FILES_BUCKET_NAME,
	}));

	await global.client.connect();
	// eslint-disable-next-line no-console
	console.log("Connected to the Database ");

	return { client, bucket };
}

// utility to check if file exists
export async function fileExists(filename: string): Promise<boolean> {
	const { client } = await connectToDb();
	const count = await client
		.db(MONGODB_DB_NAME)
		.collection(`${MONGODB_FILES_BUCKET_NAME}.files`)
		.countDocuments({ filename });

	return !!count;
}
