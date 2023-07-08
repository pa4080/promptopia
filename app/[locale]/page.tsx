import React from "react";
import { useTranslations } from "next-intl";

import Header from "@/components/Header";
import Feed from "@/components/Feed";

const Home: React.FC = () => {
	const t = useTranslations("Home");

	return (
		<section className="home_page_section">
			<Header desc={t("subHeading")} titleBlack={t("headingLn1")} titleGradient={t("headingLn2")} />
			<Feed />
		</section>
	);
};

export default Home;
