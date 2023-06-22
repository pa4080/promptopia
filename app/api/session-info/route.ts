import { getServerSession } from "next-auth";

import { NextResponse, NextRequest } from "next/server";

import { authOptions } from "@/lib/auth-options";

export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	return NextResponse.json({
		method: req.method,
		authenticated: !!session,
		session,
	});
}
