"use client";

import React, { useState } from "react";
import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
// import { useSession } from "next-auth/react";

import { PostTypeFromDb } from "@/interfaces/Post";
import logo from "@/public/icons/svg/mlt.promptopia.logo.favicon.svg";

import PostTag from "./fragments/PostTag";
import IconEmbedSvgPop from "./fragments/IconEmbedSvgPop";

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
			<div className="relative">
				<div className="flex flex-1 justify-start gap-3 cursor-pointer flex-col 3sm:flex-row items-start 3sm:items-center ">
					<div className="flex_center w-14 h-14 cursor-pointer rounded-full z-10 bg-white  min-w-[3.5rem] min-h-[3.5rem]">
						<Image
							alt={t("altProfilePicture")}
							className="rounded-full object-contain"
							height={45}
							src={post?.creator?.image ?? logo}
							width={45}
						/>
					</div>
					<div className="flex flex-col max-w-[100%] overflow-hidden px-4 3sm:px-0">
						<h3 className="font-satoshi font-semibold text-mlt-dark-2">{post?.creator?.name}</h3>

						<p className="font-inter text-mlt-dark-6 text-ellipsis overflow-hidden">
							{post?.creator?.email}
						</p>
					</div>
				</div>

				<IconEmbedSvgPop
					c1="mlt-orange-secondary"
					c2="mlt-orange-dark"
					height={22}
					op1="84"
					style={{ position: "absolute", right: "0", top: "0" }}
					text={t("altCopyPrompt")}
					type={copied ? "clipboard-check" : "clipboard"}
					width={22}
					onClick={() => handleTagClick(post?.creator?.name)}
				/>
			</div>

			<div className="prompt_card_prompt">
				<p>{post.prompt}</p>
				{post?.link && (
					<a href={post.link} rel="noreferrer" style={{ display: "table-cell" }} target="_blank">
						<IconEmbedSvgPop
							bgColor="bg-mlt-purple-secondary"
							c1="mlt-purple-secondary"
							c2="mlt-purple-secondary"
							height={18}
							op1="84"
							style={{
								width: "36px",
								height: "36px",
								position: "absolute",
								float: "right",
								right: "4px",
								top: "4px",
							}}
							stylePosWrapper={{ transform: "translate(0, 0)" }}
							text={t("altCopyPrompt")}
							type={"message-lines"}
							width={18}
							wrapperClass="none"
						/>
					</a>
				)}
			</div>
			<p>
				{(post.tags as string[]).map((tag: string, index) => (
					<PostTag key={index} text={tag} />
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
