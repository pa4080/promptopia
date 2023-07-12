/**
 * @check the differences with '@/api/posts/[[...id]]/route.ts'
 */
import { NextRequest, NextResponse } from "next/server";

import { connectToMongoDb } from "@/lib/mongodb-mongoose";
import User from "@/models/user";

interface Context {
	params: { id: string };
}

/**
 * @example fetch(`/api/users/${useId}/data`)
 */
export async function GET(request: NextRequest, { params }: Context) {
	try {
		await connectToMongoDb();
		const userId = params?.id;
		const user = (await User.find({ _id: userId }))[0];

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to retrieve a user!" }, { status: 200 });
	}
}
