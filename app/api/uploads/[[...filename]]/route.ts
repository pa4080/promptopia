// app/api/uploads/[filename]/route.ts
import { NextResponse, NextRequest } from "next/server";

import { ObjectId, GridFSFile } from "mongodb";

import { connectToDb, fileExists } from "@/lib/mongo";

import { Readable } from "stream";

const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_FILES_BUCKET_NAME = "images";

interface Context {
	params: { filename: string[] };
}

function _filename(params: Context["params"]) {
	return Object.keys(params).length > 0 ? { filename: params?.filename[0] } : {};
}

/**
 * 1. Get GridFS bucket
 * 2. If the GET request is without filename - i.e. /api/uploads/,
 * 		retrieve the list of all files: await bucket.find({}).toArray();
 * 		Otherwise if request is with filename - i.e. /api/uploads/filename.png,
 * 		find the file by name: await bucket.find({ filename: "filename.png" }).toArray();
 * 3. If the above array is empty - i.e. files.length = 0,
 * 		the collection is empty - doesn't have any files, so return 404.
 * 		If the array has one file - i.e. files.length = 1, return it as a stream.
 * 		Otherwise if the array has more than one file - i.e. files.length > 1,
 * 		return the array as JSON.
 * Note: It is possible to have multiple files with the same name.
 *  	We need to solve this case at the upload stage.
 *    Or also can retrieve the files by _id.
 */
export async function GET(request: NextRequest, { params }: Context) {
	try {
		const { bucket, client } = await connectToDb();

		if (params?.filename.length > 1) {
			if (params?.filename[0] === "id") {
				const _id = new ObjectId(params?.filename[1]);
				const db = client.db(MONGODB_DB_NAME);
				const collection = db.collection(MONGODB_FILES_BUCKET_NAME);

				const file = (await collection.find({ _id }).toArray())[0] as GridFSFile;

				const stream = bucket.openDownloadStream(_id) as unknown as ReadableStream;

				return new NextResponse(stream, {
					headers: {
						"Content-Type": file?.contentType || "image",
					},
					status: 200,
				});
			} else {
				throw new Error(
					"Invalid query. When 1 parameter is provided, it must be filename. When two are provided, the first must be string 'id' and the second must be the id."
				);
			}
		} else {
			const files = await bucket.find(_filename(params)).toArray();

			switch (files.length) {
				case 0: {
					return new NextResponse(null, { status: 404, statusText: "Not found" });
				}

				case 1: {
					const file = files.at(0)!;
					const stream = bucket.openDownloadStreamByName(
						file.filename
					) as unknown as ReadableStream;

					return new NextResponse(stream, {
						headers: {
							"Content-Type": file.contentType!,
						},
						status: 200,
					});
				}

				default:
					return NextResponse.json(files, { status: 200 });
			}
		}
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
