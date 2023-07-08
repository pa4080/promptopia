"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { useSearchParams, useRouter } from "next/navigation";

import { usePromptopiaContext } from "@/contexts/PromptopiaContext";
import { AiCategories, PostTypeFromDb, SearchTypes } from "@/interfaces/Post";

import { Path } from "@/interfaces/Path";

import PostCardList from "./PostCardList";
import CheckList, { ListItemType } from "./fragments/CheckList";
import PostCardListLoading from "./PostCardListLoading";
import IconEmbedSvg from "./fragments/IconEmbedSvg";

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

	const [searchTypes, setSearchTypes] = useState<ListItemType[]>(
		Object.values(SearchTypes).map((searchType) => ({
			label: tCommon(`searchTypes.${searchType}`),
			checked: true,
			value: searchType,
		}))
	);

	const searchParams = useSearchParams();
	const tagId = searchParams.get("tag");
	const wipe = searchParams.get("wipe");
	const router = useRouter();

	const filterPosts = () => {
		const caseInsensitiveRegex = new RegExp(searchText?.replace(/^#/, ""), "i");
		const aiCAtegoriesNames = aiCategories
			.filter((aiCategory) => aiCategory.checked)
			.map((aiCategory) => aiCategory.value);

		const filterPostsBy_Tag_or_AiCat = tagId
			? posts.filter((post) => post.tags.includes(tagId))
			: posts.filter((post) => aiCAtegoriesNames.includes(post.aiCategory));

		if (tagId) {
			router.push(Path.HOME);
		}

		const filter = searchTypes.reduce(
			(acc, curr) => ({ ...acc, [curr.value]: curr.checked }),
			{} as { [key in SearchTypes]: boolean }
		);

		return filterPostsBy_Tag_or_AiCat.filter(
			(post) =>
				(filter[SearchTypes.AUTHOR] && caseInsensitiveRegex.test(post.creator.name)) ||
				(filter[SearchTypes.AUTHOR] && caseInsensitiveRegex.test(post.creator.username)) ||
				(filter[SearchTypes.PROMPT] && caseInsensitiveRegex.test(post.prompt)) ||
				(filter[SearchTypes.TAGS] && caseInsensitiveRegex.test(post.tags.join("")))
		);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearchText(e.target.value);
	};

	useEffect(() => {
		clearTimeout(searchTimeout);

		setSearchTimeout(
			setTimeout(() => {
				setSearchResults(filterPosts());
			}, 500)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText, aiCategories, searchTypes]);

	useEffect(() => {
		if (tagId) {
			setSearchTypes(
				searchTypes.map((searchType) => ({
					...searchType,
					checked: searchType.value === SearchTypes.TAGS,
				}))
			);

			setSearchText(`#${tagId}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tagId]);

	const handleWipe = () => {
		router.push(Path.HOME);

		setSearchText("");

		setSearchTypes(
			searchTypes.map((searchType) => ({
				...searchType,
				checked: true,
			}))
		);

		setAiCategories(
			aiCategories.map((aiCategory) => ({
				...aiCategory,
				checked: true,
			}))
		);
	};

	useEffect(() => {
		if (wipe) {
			handleWipe();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wipe]);

	return (
		<section className="feed">
			<form
				className="relative w-full"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="search_input_container">
					{searchText && (
						<div className="wipe_search_btn" onClick={handleWipe}>
							<IconEmbedSvg
								color1="mlt-purple-secondary"
								color2="mlt-purple-secondary"
								height={26}
								opacity1="FF"
								opacity2="44"
								type="broom-wide"
								width={32}
							/>
						</div>
					)}

					<input
						required
						className="form_input search_input"
						placeholder={t("searchForPlaceholder")}
						type="text"
						value={searchText}
						onChange={handleSearchChange}
					/>
				</div>

				<div className="search_filters_container">
					<CheckList
						handleAssign={setAiCategories}
						icon={{ size: 22, color: "mlt-orange-secondary" }}
						items={aiCategories}
						type="atLeastOneSelected"
					/>

					<CheckList
						handleAssign={setSearchTypes}
						icon={{ size: 22, color: "mlt-orange-primary", type: "radio" }}
						items={searchTypes}
						style={{ justifyContent: "flex-end", paddingRight: "0.25rem" }}
						type="atLeastOneSelected"
					/>
				</div>
			</form>

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
