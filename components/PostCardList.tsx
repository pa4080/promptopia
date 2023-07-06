import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { PostTypeFromDb } from "@/interfaces/Post";

import { Path } from "@/interfaces/Path";

import PostCard from "./PostCard";

interface PromptCardListProps {
	data: PostTypeFromDb[];
	edit?: boolean;
	del?: boolean;
}

const PostCardList: React.FC<PromptCardListProps> = ({ data, edit = false, del = false }) => {
	const [copied, setCopied] = useState("");
	const router = useRouter();

	const handleTagClick = (tag: string) => {
		// eslint-disable-next-line no-console
		console.log(tag);
	};

	const handleDelete = (post: PostTypeFromDb) => {
		router.push(`${Path.POST_DELETE}?id=${post._id}`);
	};

	const handleEdit = (post: PostTypeFromDb) => {
		router.push(`${Path.POST_UPDATE}?id=${post._id}`);
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