/**
 * This file comes from:
 * > npx create-next-app@latest --example with-mongodb
 * > In this state, it establishes jus a connection with
 * > MongoDB/Atlas, and doesn't select any database...
 *
 * See also ./mongodb-mongoose.ts which is the current connector in use.
 *
 * The integration with MongoDB/Atlas is created via the Vercel Dashboard,
 * where MONGODB_URI is set as an environment variable manually.
 * Then within the CLI here are used the following commands:
 * > npm i vercel --save-dev
 * > npx vercel link
 * > npx vercel env pull
 *
 * For more details check the following repository:
 * > https://github.com/metalevel-tech/exc-nextjs-2023-with-mongodb-example
 *
 * In the most tutorials Next.js + MongoDM + JavaScript
 * the options object looks like:
 *
 * const options = {
 *    useNewUrlParser: true,
 *    useUnifiedTopology: true,
 * }
 *
 * The both options are deprecated and no longer exist on
 * "MongoClientOptions" interface.
 *
 * Refs.:
 * > https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/
 * > https://mongoosejs.com/docs/5.x/docs/deprecations.html
 *
 */
import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_OPTIONS: MongoClientOptions = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(MONGODB_URI, MONGODB_OPTIONS);
		globalWithMongo._mongoClientPromise = client.connect();
	}

	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(MONGODB_URI, MONGODB_OPTIONS);
	clientPromise = client.connect();
}

// eslint-disable-next-line no-console
console.log("Module: Just connected to MongoDB!");

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
