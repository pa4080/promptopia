"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserProfile from "@/app/components/UserProfile";
import { PostTypeFromDb } from "@/interfaces/Post";
import { fetchPosts } from "@/lib/fetch";
import { UserTypeFromDb } from "@/interfaces/User";
import { Path } from "@/interfaces/Path";

const UserProfilePage: React.FC = () => {
	const { data: session } = useSession();
	const [posts, setPosts] = useState<PostTypeFromDb[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (session && session?.user?.id) {
			(async () => {
				setPosts(await fetchPosts(`/api/users/${session?.user?.id}/posts`));
			})();
		} else {
			router.push(Path.HOME);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleEdit = () => {
		// eslint-disable-next-line no-console
		console.log("Edit");
	};

	const handleDelete = async () => {
		// eslint-disable-next-line no-console
		console.log("Delete");
	};

	return (
		<UserProfile
			handleDelete={handleDelete}
			handleEdit={handleEdit}
			posts={posts}
			user={session?.user as unknown as UserTypeFromDb}
		/>
	);
};

export default UserProfilePage;
