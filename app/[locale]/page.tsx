import React from "react";
import { useTranslations } from "next-intl";

import Header from "@/components/Header";
import Feed from "@/components/Feed";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
	const t = useTranslations("Home");

	return (
		<section className="page_section_center">
			<Header desc={t("subHeading")} titleBlack={t("headingLn1")} titleGradient={t("headingLn2")} />
			<Feed />
			<Footer />
		</section>
	);
};

export default Home;
