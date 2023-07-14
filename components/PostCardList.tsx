import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PostTypeFromDb } from "@/interfaces/Post";
import { Path } from "@/interfaces/Path";
import { usePromptopiaContext } from "@/contexts/PromptopiaContext";

import PostCard from "./PostCard";

interface PromptCardListProps {
	data: PostTypeFromDb[];
}

const PostCardList: React.FC<PromptCardListProps> = ({ data }) => {
	const [copied, setCopied] = useState("");
	const router = useRouter();
	const { setPostCardListSize } = usePromptopiaContext();
	const postCardListRef = React.useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		function updateSize() {
			setPostCardListSize(postCardListRef?.current?.clientWidth ?? 0);
		}

		window.addEventListener("resize", updateSize);
		updateSize();

		return () => window.removeEventListener("resize", updateSize);
	}, [setPostCardListSize]);

	const handleTagClick = (tag: string) => {
		// eslint-disable-next-line no-console
		router.push(`${Path.HOME}?tag=${tag}`);
	};

	const handleDelete = (post: PostTypeFromDb) => {
		router.push(`${Path.POST_DELETE}?id=${post._id}`);
	};

	const handleEdit = (post: PostTypeFromDb) => {
		router.push(`${Path.POST_UPDATE}?id=${post._id}`);
	};

	const calculateColumns = (items?: number) => {
		switch (items) {
			case 1:
				return "sm:columns-1 2xl:columns-1";
			case 2:
				return "sm:columns-2 2xl:columns-2";
			default:
				return "sm:columns-2 2xl:columns-3";
		}
	};

	return (
		<div ref={postCardListRef} className={`post_card_list ${calculateColumns(data.length)}`}>
			{data.map((post) => {
				if (!post || !post?.creator || !post?.prompt) {
					return null;
				}

				return (
					<PostCard
						key={post._id}
						copied={copied}
						handleDelete={() => handleDelete(post)}
						handleEdit={() => handleEdit(post)}
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
