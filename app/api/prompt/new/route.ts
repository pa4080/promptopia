// Ref.: https://youtu.be/wm5gMKuwSYk?t=7699
// https://nextjs.org/docs/app/api-reference/functions/next-response
import { NextResponse, NextRequest } from "next/server";

import Prompt from "@/models/prompt";

import { connectMongoDb } from "@/lib/mongodb-mongoose-connect";

export async function POST(req: NextRequest) {
	const { userId, prompt, tags, link } = await req.json();

	try {
		await connectMongoDb();
		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tags,
			link,
		});

		await newPrompt.save();

		return NextResponse.json(
			{
				body: {
					message: "Prompt created successfully!",
					prompt: newPrompt,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Failed to create a new prompt!" }, { status: 500 });
	}
}
