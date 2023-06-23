// Ref.: https://youtu.be/wm5gMKuwSYk?t=7699
// https://nextjs.org/docs/app/api-reference/functions/next-response
import { NextResponse, NextRequest } from "next/server";

import Post from "@/models/post";

import { connectMongoDb } from "@/lib/mongodb-mongoose-connect";

export async function POST(req: NextRequest) {
	const { userId, prompt, tags, model, link } = await req.json();

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
				body: {
					message: "Prompt created successfully!",
					prompt: new_Post,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Failed to create a new prompt!" }, { status: 500 });
	}
}
