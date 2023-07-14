import React from "react";
import { useTranslations } from "next-intl";

import { UserProfileType } from "@/interfaces/Profile";

import Header from "./Header";
import PostCardList from "./PostCardList";

const UserPosts: React.FC<UserProfileType> = ({ user, posts }) => {
	const t = useTranslations("Profile");

	return (
		<section className="page_section_left w-full">
			<Header
				desc={
					user?.description
						? `${user?.description.replace(/\.$/, "")}.`
						: t("placeholderUserDescription")
				}
				gradient="blue_gradient"
				textStyle="text-left"
				titleGradient={user?.name ?? t("placeholderUser")}
			/>

			<PostCardList data={posts} />
		</section>
	);
};

export default UserPosts;
