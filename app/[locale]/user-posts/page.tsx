"use client";
import React, { useState, useEffect } from "react";

import { redirect, useSearchParams, useRouter } from "next/navigation";

import { PostTypeFromDb } from "@/interfaces/Post";
import { fetchPosts, fetchSingleUser } from "@/lib/fetch-helpers";
import { UserTypeFromDb } from "@/interfaces/User";
import { usePromptopiaContext } from "@/contexts/PromptopiaContext";
import { Path } from "@/interfaces/Path";
import UserPosts from "@/components/UserPosts";

const UserProfile_Page: React.FC = () => {
	const { posts, users, setUsers } = usePromptopiaContext();
	const [userPosts, setUserPosts] = useState<PostTypeFromDb[]>([]);
	const [user, setUser] = useState<UserTypeFromDb>({} as UserTypeFromDb);

	const router = useRouter();

	const searchParams = useSearchParams();
	const userId = searchParams.get("user_id");

	useEffect(() => {
		if (!userId) {
			redirect(Path.HOME);
		}

		const findUser = users.length > 0 ? users.find((user) => user._id === userId) : null;

		if (findUser) {
			setUser(findUser);
		} else {
			(async () => {
				const addUser = await fetchSingleUser(userId);

				if (addUser) {
					setUsers([...users, addUser]);
					setUser(addUser);
				} else {
					// In this place "redirect(Path.HOME)" is not working
					// probably it is a bug in "next/navigation"
					router.push(Path.HOME);
				}
			})();
		}

		const findUserPosts =
			posts && (posts.filter((post) => post.creator._id === userId) as PostTypeFromDb[]);

		if (findUserPosts) {
			setUserPosts(findUserPosts);
		} else {
			// If the users posts are not in the posts array, fetch them...
			// TODO: ...this looks like a nonsense and likely to be deleted!
			(async () => {
				setUserPosts(await fetchPosts(`/api/users/${userId}/posts`));
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [posts, userId, users]);

	return <UserPosts posts={userPosts} user={user} />;
};

export default UserProfile_Page;
