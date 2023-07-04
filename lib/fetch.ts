export async function fetchPosts(uri: string) {
	const response = await fetch(uri);
	const data = await response.json();

	if (!response.ok) {
		throw new Error("Error in 'fetchPosts()'", data.message);
	}

	return data.posts;
}
