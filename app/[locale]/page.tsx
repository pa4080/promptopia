import React from "react";
import { useTranslations } from "next-intl";

import Feed from "../components/Feed";

const Home: React.FC = () => {
	const t = useTranslations("Home");

	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				{t("headingLn1")}
				<br /*className="max-md:hidden"*/ />{" "}
				<span className="orange_gradient">{t("headingLn2")}</span>
			</h1>
			<p className="desc text-center">{t("subHeading")}</p>
			<Feed />
		</section>
	);
};

export default Home;
