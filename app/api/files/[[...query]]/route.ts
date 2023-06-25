// app/api/files/[filename]/route.ts
import { NextResponse, NextRequest } from "next/server";

import { ObjectId, GridFSFile } from "mongodb";

import { connectToDb, fileExists } from "@/lib/mongo-reacthustle-example";

import { Readable } from "stream";

const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_FILES_BUCKET_NAME = process.env.MONGODB_FILES_BUCKET_NAME;

interface Context {
	params: { query: string[] };
}

function _filename(params: Context["params"]) {
	return Object.keys(params).length > 0 ? { filename: params?.query[0] } : {};
}

/**
 * 1) If the query has 2 parameters,
 *    the first must be string "id" and the second must be the id.
 * 2) If the query has 1 parameter, it must be the filename.
 *    > If the filename is not found in db return the file list
 *      or 404 in case the bucket is empty.
 *    > It is possible to have multiple files with the same name.
 *      In this case, also, an array of files will be returned.
 * 3) If the query has no parameters, return the file list.
 */
export async function GET(request: NextRequest, { params }: Context) {
	try {
		const { bucket, client } = await connectToDb();

		if (params?.query.length > 1) {
			if (params?.query[0] === "id") {
				const _id = new ObjectId(params?.query[1]);
				const db = client.db(MONGODB_DB_NAME);
				const collection = db.collection(`${MONGODB_FILES_BUCKET_NAME}.files`);

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

export async function POST(request: NextRequest) {
	try {
		const { bucket } = await connectToDb();
		// get the form data
		const data = await request.formData();

		// map through all the entries
		for (const entry of Array.from(data.entries())) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [key, value] = entry;

			// FormDataEntryValue can either be type `Blob` or `string`
			// if its type is object then it's a Blob
			const isFile = typeof value === "object";

			if (isFile) {
				const blob = value as Blob;
				const filename = blob.name;

				const existing = await fileExists(filename);

				if (existing) {
					// If file already exists, let's skip it.
					// If you want a different behavior such as override, modify this part.
					continue;
				}

				//convert the blob to stream
				const buffer = Buffer.from(await blob.arrayBuffer());
				const stream = Readable.from(buffer);

				const uploadStream = bucket.openUploadStream(filename, {
					// make sure to add content type so that it will be easier to set later.
					contentType: blob.type,
					metadata: {}, // add your metadata here if any
				});

				// pipe the readable stream to a writeable stream to save it to the database
				stream.pipe(uploadStream);

				// const res = stream.pipe(uploadStream);
				// console.log(res.id.toString());
			}
		}

		// return the response after all the entries have been processed.
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
