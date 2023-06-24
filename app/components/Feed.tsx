//Ref.:https://youtu.be/wm5gMKuwSYk?t=8082
"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { PostTypeFromDb } from "@/interfaces/Post";

import PostCard from "./PostCard";

import CheckList from "./fragments/CheckList";

interface PromptCardListProps {
	data: PostTypeFromDb[];
	handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) =>
	data.map((post) => <PostCard key={post._id} handleTagClick={handleTagClick} post={post} />);

const Feed: React.FC = () => {
	const t = useTranslations("Feed");
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState<PostTypeFromDb[]>([]);

	// TODO: Move this part to server-side rendering like in...
	// https://github.com/metalevel-tech/template-nextjs-13-app-router/blob/master/app/[locale]/games/page.tsx
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/posts");
			const data = await response.json();

			// eslint-disable-next-line no-console
			console.log("data", data);

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

			<CheckList
				icon={{ size: 20 }}
				items={[
					{ label: "GPT", checked: true },
					{ label: "SD", checked: false },
				]}
				type="multiSelect"
				// label={t("model")}
			/>
			<PromptCardList
				data={posts}
				handleTagClick={(tag: string) => {
					// eslint-disable-next-line no-console
					console.log(tag);
				}}
			/>
		</section>
	);
};

export default Feed;
