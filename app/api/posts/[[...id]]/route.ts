/**
 * @see https://nextjs.org/docs/app/api-reference
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * @see Ref: https://youtu.be/wm5gMKuwSYk?t=7699
 *
 * @note The PATCH and DELETE functions are created bt the help of the
 * 			 VSC extension Bito GPT-4 AI. To check how this is implemented
 *       in the original guide you can @see https://youtu.be/wm5gMKuwSYk?t=10336
 *
 * Spas Z. Spasov REST API Implementation notes:
 * A route file (only for app/ router) allows you
 * to create custom request handlers for a given route.
 *
 * export async function GET(request: Request) {}     // GET:  Retrieve a resource(s)
 * export async function HEAD(request: Request) {}    // HEAD: Retrieve resource metadata
 * export async function POST(request: Request) {}    // POST: Create a new resource
 * export async function PUT(request: Request) {}     // PUT:  Update a resource
 * export async function PATCH(request: Request) {}   // PATCH: Partially update a resource
 * export async function DELETE(request: Request) {}  // DELETE: Delete a resource
 * export async function OPTIONS(request: Request) {} // OPTIONS: Retrieve resource options
 *
 * If `OPTIONS` is not defined, Next.js will automatically
 * implement `OPTIONS` and  set the appropriate Response
 * `Allow` header depending on the other methods defined
 * in the route handler.
 */

import { NextRequest, NextResponse } from "next/server";

import { connectToMongoDb } from "@/lib/mongodb-mongoose";
import Post from "@/models/post";

interface Context {
	params: { id: string[] };
}

function paramsToObject(params: Context["params"]) {
	return Object.keys(params).length > 0 ? { _id: params?.id[0] } : {};
}

export async function GET(request: NextRequest, { params }: Context) {
	try {
		await connectToMongoDb();
		const posts = await Post.find(paramsToObject(params)).populate(["creator", "image"]);

		return NextResponse.json({ posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to retrieve posts!" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	const { creator, prompt, tags, aiCategory, link, image } = await request.json();

	try {
		await connectToMongoDb();
		const newPost = new Post({ creator, prompt, tags, aiCategory, link, image });

		await newPost.save();
		await newPost.populate(["creator", "image"]);

		return NextResponse.json(
			{ message: "Prompt created successfully!", post: newPost },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(error, { status: 500 }); // return new Response(JSON.stringify(error), { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: Context) {
	const { creator, prompt, tags, aiCategory, link, image } = await request.json();

	try {
		await connectToMongoDb();
		const updatedPost = await Post.findOneAndUpdate(
			paramsToObject(params),
			{ creator, prompt, tags, aiCategory, link, image },
			{ new: true }
		);

		if (!updatedPost) {
			return NextResponse.json({ error: "Post not found!" }, { status: 404 });
		}

		await updatedPost.populate(["creator", "image"]);

		return NextResponse.json(
			{ message: "Post updated successfully!", post: updatedPost },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Failed to update post!" }, { status: 500 });
	}
}

export async function PATCH(request: NextRequest, { params }: Context) {
	const { creator, prompt, tags, aiCategory, link, image } = await request.json();

	try {
		await connectToMongoDb();

		const updatedPost = await Post.findOneAndUpdate(
			paramsToObject(params),
			{ creator, prompt, tags, aiCategory, link, image },
			{ new: true }
		);

		if (!updatedPost) {
			return NextResponse.json({ error: "Post not found!" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Post updated successfully!", post: updatedPost },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Failed to update post!" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: Context) {
	try {
		await connectToMongoDb();

		const deletedPost = await Post.findOneAndDelete(paramsToObject(params));

		if (!deletedPost) {
			return NextResponse.json({ error: "Post not found!" }, { status: 404 });
		}

		return NextResponse.json({ message: "Post deleted successfully!" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete post!" }, { status: 500 });
	}
}
