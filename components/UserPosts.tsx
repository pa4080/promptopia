import React from "react";

import { UserProfileType } from "@/interfaces/Profile";

import Header from "./Header";
import PostCardList from "./PostCardList";

const UserPosts: React.FC<UserProfileType> = ({ user, posts }) => {
	return (
		<section className="page_section_left w-full">
			<Header
				desc={user?.description ? `${user?.description.replace(/\.$/, "")}.` : ""}
				gradient="blue_gradient"
				textStyle="text-left"
				titleGradient={user?.name ?? ""}
			/>

			<PostCardList data={posts} />
		</section>
	);
};

export default UserPosts;
