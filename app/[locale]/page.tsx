import React from "react";

import Welcome from "@/app/components/Welcome";
import Feed from "@/app/components/Feed";

const Home: React.FC = () => {
	return (
		<section className="w-full flex_center flex-col">
			<Welcome />
			<Feed />
		</section>
	);
};

export default Home;
