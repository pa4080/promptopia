"use client";

import React, { useState } from "react";
import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
// import { useSession } from "next-auth/react";

import { PostTypeFromDb } from "@/interfaces/Post";
import logo from "@/public/icons/svg/mlt.promptopia.logo.favicon.svg";

import IconEmbedSVG from "./fragments/IconEmbedSVG";

interface Props {
	post: PostTypeFromDb;
	handleTagClick: (tag: string) => void;
	handleEdit?: (tag: string) => void;
	handleDelete?: (tag: string) => void;
}

export const PostCard: React.FC<Props> = ({ post, handleTagClick }) => {
	const t = useTranslations("PostCard");
	const [copied, setCopied] = useState(false);

	if (!post || !post?.creator) {
		return null;
	}

	return (
		<div className="prompt_card">
			<div className="flex_between_start gap-5">
				<div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
					<div className="flex_center w-14 h-14 cursor-pointer rounded-full z-10 bg-white">
						<Image
							alt={t("altProfilePicture")}
							className="rounded-full object-contain"
							height={45}
							src={post?.creator?.image ?? logo}
							width={45}
						/>
					</div>
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-mlt-dark-2">{post?.creator?.name}</h3>
						<p className="font-inter text-mlt-dark-6">{post?.creator?.email}</p>
					</div>
				</div>
				<div
					className="copy_btn"
					// onClick={() => {
					// 	// hello
					// }}
				>
					<IconEmbedSVG
						alt={t("altCopyPrompt")}
						color1="mlt-orange-secondary"
						color2="mlt-orange-dark"
						height={34}
						opacity1="84"
						style={{ zIndex: 10 }}
						type={copied ? "clipboard-check" : "clipboard"}
						width={22}
					/>
				</div>
			</div>

			<p>{post.prompt}</p>
			<p>
				{post.tags.map((tag: string, index) => (
					<span
						key={index}
						className="mx-0.5 my-1 py-0.5 px-2 inline-block 
						rounded-full bg-white/50 hover:bg-white/90 cursor-pointer
						transition-colors duration-200 "
					>
						<IconEmbedSVG
							color1="mlt-orange-secondary"
							color2="mlt-orange-dark"
							height={20}
							opacity1="84"
							style={{ zIndex: 10, display: "inline-block", marginRight: "3px" }}
							type="tag"
							width={20}
						/>
						{tag}
					</span>
				))}
			</p>
		</div>
	);
};

interface PromptCardListProps {
	data: PostTypeFromDb[];
	handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) =>
	data.map((post) => <PostCard key={post._id} handleTagClick={handleTagClick} post={post} />);

export default PromptCardList;
