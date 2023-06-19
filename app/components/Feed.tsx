import React from "react";
import { useTranslations } from "next-intl";

const Feed: React.FC = () => {
	const t = useTranslations("Home");

	return <div>feed</div>;
};

export default Feed;
