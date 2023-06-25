// app/api/uploads/[filename]/route.ts
import { NextResponse, NextRequest } from "next/server";

import { connectToDb, fileExists } from "@/lib/mongo";

import { Readable } from "stream";

interface Context {
	params: { filename: string[] };
}

function _obj(params: Context["params"]) {
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
	const { bucket } = await connectToDb();

	const files = await bucket.find(_obj(params)).toArray();

	switch (files.length) {
		case 0: {
			return new NextResponse(null, { status: 404, statusText: "Not found" });
		}

		case 1: {
			const file = files.at(0)!;
			const stream = bucket.openDownloadStreamByName(
				params?.filename[0]
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
