/**
 * @check the differences with '@/api/posts/[[...id]]/route.ts'
 */
import { NextRequest, NextResponse } from "next/server";

import { connectToMongoDb } from "@/lib/mongodb-mongoose";
import Post from "@/models/post";

interface Context {
	params: { id: string };
}

export async function GET(request: NextRequest, { params }: Context) {
	try {
		await connectToMongoDb();
		const posts = await Post.find({ creator: params?.id }).populate(["creator", "image"]);

		return NextResponse.json({ posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to retrieve posts!" }, { status: 500 });
	}
}
