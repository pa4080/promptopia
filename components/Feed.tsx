//Ref.:https://youtu.be/wm5gMKuwSYk?t=8082
"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { usePromptopiaContext } from "@/contexts/PromptopiaContext";

import { fetchPosts } from "@/lib/fetch-helpers";

import { AiCategories, PostTypeFromDb } from "@/interfaces/Post";

import PostCardList from "./PostCardList";

import CheckList, { ListItemType } from "./fragments/CheckList";

const Feed: React.FC = () => {
	const t = useTranslations("Feed");
	const tCommon = useTranslations("Common");
	// const [posts, setPosts] = useState<PostTypeFromDb[]>([]);
	const { posts } = usePromptopiaContext();
	const [searchText, setSearchText] = useState("");
	const [aiCategories, setAiCategories] = useState<ListItemType[]>(
		Object.values(AiCategories).map((aiCategory) => ({
			label: tCommon(`aiCats.${aiCategory}`),
			checked: true,
			value: aiCategory,
		}))
	);

	// useEffect(() => {
	// 	(async () => {
	// 		setPosts(await fetchPosts("/api/posts"));
	// 	})();
	// }, []);

	return (
		<section className="feed">
			<form className="relative w-full flex justify-center items-center">
				<input
					required
					className="form_input search_input"
					placeholder={t("searchForPlaceholder")}
					type="text"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</form>

			<div className="text-mlt-dark-6 font-base w-full pl-0.5">
				<CheckList
					handleAssign={setAiCategories}
					icon={{ size: 22, color: "mlt-orange-secondary" }}
					items={aiCategories}
					type="atLeastOneSelected"
				/>
			</div>

			<PostCardList data={posts} />
		</section>
	);
};

export default Feed;
