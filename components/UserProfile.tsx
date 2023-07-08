import React from "react";
import { useTranslations } from "next-intl";

import { UserProfileType } from "@/interfaces/Profile";

import Header from "./Header";
import PostCardList from "./PostCardList";

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

const UserProfile: React.FC<UserProfileType> = ({ user, posts }) => {
	const t = useTranslations("Profile");

	return (
		<section className="page_section_left w-full">
			<Header
				desc={
					user?.description
						? `${user?.description}: ${t("description")} ${t("accountRemoveDisclaimer", {
								email: `<a href="mailto:${SUPPORT_EMAIL}" target="_blank">${SUPPORT_EMAIL}</a>`,
						  })}`
						: ""
				}
				gradient="blue_gradient"
				textStyle="text-left"
				titleGradient={user?.name ?? ""}
			/>

			<PostCardList del edit data={posts} />
		</section>
	);
};

export default UserProfile;
