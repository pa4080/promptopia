import React from "react";
import { useTranslations } from "next-intl";

import { Profile } from "@/interfaces/Profile";

const UserProfile: React.FC<Profile> = ({ user, posts, handleEdit, handleDelete }) => {
	const t = useTranslations("Profile");

	return (
		<div>
			{user?.name}, {user?.description}
		</div>
	);
};

export default UserProfile;
