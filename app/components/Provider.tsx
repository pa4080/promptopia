import React from "react";
import { useTranslations } from "next-intl";

const Provider: React.FC = () => {
	const t = useTranslations("Home");

	return <div>provider</div>;
};

export default Provider;
