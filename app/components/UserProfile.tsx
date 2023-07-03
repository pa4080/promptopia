import React from "react";
import { useTranslations } from "next-intl";

import { Profile } from "@/interfaces/Profile";

import Header from "./Header";
import PostCardList from "./PostCardList";

const UserProfile: React.FC<Profile> = ({ user, posts }) => {
	const t = useTranslations("Profile");

	return (
		<section className="w-full">
			<Header
				desc={`${user?.description}: ${t("description")}`}
				gradient="blue_gradient"
				textStyle="text-left"
				titleGradient={user?.name}
			/>

			<PostCardList del edit data={posts} />
		</section>
	);
};

export default UserProfile;
