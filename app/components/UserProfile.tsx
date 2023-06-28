import React from "react";
import { useTranslations } from "next-intl";

import { Profile } from "@/interfaces/Profile";

const UserProfile: React.FC<Profile> = ({}) => {
	const t = useTranslations("Profile");

	return <div>profile</div>;
};

export default UserProfile;
