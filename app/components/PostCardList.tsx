import React, { useState } from "react";

import { PostTypeFromDb } from "@/interfaces/Post";

import PostCard from "./PostCard";

interface PromptCardListProps {
	data: PostTypeFromDb[];
	edit?: boolean;
	del?: boolean;
}

const PostCardList: React.FC<PromptCardListProps> = ({ data, edit = false, del = false }) => {
	const [copied, setCopied] = useState("");

	const handleTagClick = (tag: string) => {
		// eslint-disable-next-line no-console
		console.log(tag);
	};

	const handleDelete = (post: PostTypeFromDb) => {
		// eslint-disable-next-line no-console
		console.log("delete", post);
	};

	const handleEdit = (post: PostTypeFromDb) => {
		// eslint-disable-next-line no-console
		console.log("edit", post);
	};

	return (
		<div className="post_card_list">
			{data.map((post) => {
				if (!post || !post?.creator || !post?.prompt) {
					return null;
				}

				return (
					<PostCard
						key={post._id}
						copied={copied}
						handleDelete={() => (del ? handleDelete(post) : undefined)}
						handleEdit={() => (edit ? handleEdit(post) : undefined)}
						handleTagClick={handleTagClick}
						post={post}
						setCopied={setCopied}
					/>
				);
			})}
		</div>
	);
};

export default PostCardList;
