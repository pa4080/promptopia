"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { usePromptopiaContext } from "@/contexts/PromptopiaContext";
import { AiCategories, PostTypeFromDb } from "@/interfaces/Post";

import PostCardList from "./PostCardList";
import CheckList, { ListItemType } from "./fragments/CheckList";
import PostCardListLoading from "./PostCardListLoading";

const Feed: React.FC = () => {
	const t = useTranslations("Feed");
	const tCommon = useTranslations("Common");
	const { posts } = usePromptopiaContext();
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>(null!);
	const [searchResults, setSearchResults] = useState<PostTypeFromDb[]>([]);
	const [aiCategories, setAiCategories] = useState<ListItemType[]>(
		Object.values(AiCategories).map((aiCategory) => ({
			label: tCommon(`aiCats.${aiCategory}`),
			checked: true,
			value: aiCategory,
		}))
	);

	const filterPosts = useCallback(
		(searchText?: string) => {
			const caseInsensitiveRegex = new RegExp(searchText ?? "", "i");
			const aiCAtegoriesNames = aiCategories
				.filter((aiCategory) => aiCategory.checked)
				.map((aiCategory) => aiCategory.value);

			const outputPosts = posts.filter((post) => aiCAtegoriesNames.includes(post.aiCategory));

			return outputPosts.filter(
				(post) =>
					caseInsensitiveRegex.test(post.creator.name) ||
					caseInsensitiveRegex.test(post.creator.username) ||
					caseInsensitiveRegex.test(post.prompt) ||
					caseInsensitiveRegex.test(post.tags.join(""))
			);
		},
		[aiCategories, posts]
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const filteredPosts = filterPosts(searchText);

				setSearchResults(filteredPosts);
			}, 500)
		);
	};

	useEffect(() => {
		setSearchResults(filterPosts());
	}, [aiCategories, filterPosts]);

	return (
		<section className="feed">
			<form
				className="relative w-full flex justify-center items-center"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					required
					className="form_input search_input"
					placeholder={t("searchForPlaceholder")}
					type="text"
					value={searchText}
					onChange={handleSearchChange}
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

			{posts.length === 0 ? (
				<PostCardListLoading />
			) : (searchResults.length > 0 && searchResults.length !== posts.length) || searchText ? (
				<PostCardList data={searchResults} />
			) : (
				<PostCardList data={posts} />
			)}
		</section>
	);
};

export default Feed;
