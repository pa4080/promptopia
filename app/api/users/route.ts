// The "route.js/ts" files can be placed within the general "app" folder or within a sub-folder,
// but it is better clean way to separate them in to the "app/api" folder.

// http://localhost:3000/api/users

export async function GET(req: Request, res: Response) {
	// eslint-disable-next-line no-console
	console.log(req, res);

	return new Response("Hello World API!", { status: 200 });
}
