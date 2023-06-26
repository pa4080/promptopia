/**
 * @see https://nextjs.org/docs/app/api-reference
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * @see Ref: https://youtu.be/wm5gMKuwSYk?t=7699
 *
 * S.Z.S REST API Implementation notes:
 * A route file (only for app/ router) allows you
 * to create custom request handlers for a given route.
 *
 * export async function GET(request: Request) {}     // GET:  Retrieve a resource(s)
 * export async function HEAD(request: Request) {}    // HEAD: Retrieve resource metadata
 * export async function POST(request: Request) {}    // POST: Create a new resource
 * export async function PUT(request: Request) {}     // PUT:  Update a resource
 * export async function DELETE(request: Request) {}  // DELETE: Delete a resource
 * export async function PATCH(request: Request) {}   // PATCH: Partially update a resource
 * export async function OPTIONS(request: Request) {} // OPTIONS: Retrieve resource options
 *
 * If `OPTIONS` is not defined, Next.js will automatically
 * implement `OPTIONS` and  set the appropriate Response
 * `Allow` header depending on the other methods defined
 * in the route handler.
 */

import { NextRequest, NextResponse } from "next/server";

import Post from "@/models/post";
import { connectMongoDb } from "@/lib/mongodb-mongoose-connect";

interface Context {
	params: { id: string[] };
}

function _obj(params: Context["params"]) {
	return Object.keys(params).length > 0 ? { _id: params?.id[0] } : {};
}

export async function GET(request: NextRequest, { params }: Context) {
	try {
		await connectMongoDb();
		const posts = await Post.find(_obj(params)).populate(["creator", "image"]);

		return NextResponse.json({ posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to retrieve posts!" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	const { creator, prompt, tags, aiModelType, link, image } = await request.json();

	try {
		await connectMongoDb();
		const new_Post = new Post({ creator, prompt, tags, aiModelType, link, image });

		await new_Post.save();

		return NextResponse.json({ message: "Prompt created successfully!" }, { status: 201 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
		// return new Response(JSON.stringify(error), { status: 500 });
	}
}
