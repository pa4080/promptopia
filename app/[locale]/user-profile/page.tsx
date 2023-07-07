"use client";
import React, { useState, useEffect } from "react";

import UserProfile from "@/components/UserProfile";
import { PostTypeFromDb } from "@/interfaces/Post";
import { fetchPosts } from "@/lib/fetch-helpers";
import { UserTypeFromDb } from "@/interfaces/User";
import { usePromptopiaContext } from "@/contexts/PromptopiaContext";

const UserProfile_Page: React.FC = () => {
	const { posts, session } = usePromptopiaContext();
	const [userPosts, setUserPosts] = useState<PostTypeFromDb[]>([]);

	useEffect(() => {
		const findUserPosts =
			posts &&
			session &&
			(posts.filter((post) => post.creator._id === session?.user?.id) as PostTypeFromDb[]);

		if (findUserPosts) {
			setUserPosts(findUserPosts);
		} else {
			// If the users posts are not in the posts array, fetch them...
			// TODO: ...this looks like a nonsense and likely to be deleted!
			(async () => {
				session && setUserPosts(await fetchPosts(`/api/users/${session?.user?.id}/posts`));
			})();
		}
	}, [posts, session]);

	return (
		session && <UserProfile posts={userPosts} user={session?.user as unknown as UserTypeFromDb} />
	);
};

export default UserProfile_Page;
