//Ref.:https://youtu.be/wm5gMKuwSYk?t=8082
"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { AiCategories, PostTypeFromDb } from "@/interfaces/Post";

import PromptCardList from "./PostCard";

import CheckList, { ListItemType } from "./fragments/CheckList";

const Feed: React.FC = () => {
	const t = useTranslations("Feed");
	const tCommon = useTranslations("Common");
	const [searchText, setSearchText] = useState("");
	const [aiCategories, setAiCategories] = useState<ListItemType[]>(
		Object.values(AiCategories).map((aiCategory) => ({
			label: tCommon(`aiCats.${aiCategory}`),
			checked: true,
			value: aiCategory,
		}))
	);
	const [posts, setPosts] = useState<PostTypeFromDb[]>([]);

	// TODO: Move this part to server-side rendering like in...
	// https://github.com/metalevel-tech/template-nextjs-13-app-router/blob/master/app/[locale]/games/page.tsx
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/posts");
			const data = await response.json();

			// eslint-disable-next-line no-console
			// console.log("data", data);

			setPosts(data.posts);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex_center">
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

			<div className="post_feed">
				<PromptCardList
					data={posts}
					handleTagClick={(tag: string) => {
						// eslint-disable-next-line no-console
						console.log(tag);
					}}
				/>
			</div>
		</section>
	);
};

export default Feed;
