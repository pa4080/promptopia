// Ref.: https://youtu.be/wm5gMKuwSYk?t=7699
// https://nextjs.org/docs/app/api-reference/functions/next-response
import { NextResponse, NextRequest } from "next/server";

import Post from "@/models/post";

import { connectMongoDb } from "@/lib/mongodb-mongoose-connect";

/**
 * REST API Methods
 * > POST: Create a new resource
 * > GET: Retrieve a resource
 * > PUT: Update a resource
 * > DELETE: Delete a resource
 * > PATCH: Partially update a resource
 * @see https://nextjs.org/docs/app/api-reference
 * @see https://www.techtarget.com/searchapparchitecture/tip/The-5-essential-HTTP-methods-in-RESTful-API-development
 */
export async function GET(/*req: NextRequest*/) {
	try {
		await connectMongoDb();
		const posts = await Post.find({}).populate("creator");

		return NextResponse.json({ posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to retrieve posts!" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	// console.log("POST request", request.method);
	const { userId, prompt, tags, model, link } = await request.json();

	try {
		await connectMongoDb();
		const new_Post = new Post({
			creator: userId,
			prompt,
			tags,
			model,
			link,
		});

		await new_Post.save();

		return NextResponse.json(
			{
				message: "Prompt created successfully!",
				// prompt: new_Post,
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Failed to create a new prompt!" }, { status: 500 });
	}
}
