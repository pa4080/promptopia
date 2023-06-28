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
	copied: string;
	setCopied: React.Dispatch<React.SetStateAction<string>>;
	handleTagClick: (tag: string) => void;
	handleEdit?: (tag: string) => void;
	handleDelete?: (tag: string) => void;
}

export const PostCard: React.FC<Props> = ({ post, copied, setCopied, handleTagClick }) => {
	const t = useTranslations("PostCard");

	const handlePromptCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => {
			setCopied("");
		}, 3500);
	};

	return (
		<div className="prompt_card">
			<div className="relative">
				<div className="flex flex-1 justify-start gap-3 cursor-pointer  flex-row items-center ">
					<div className="flex_center w-14 h-14 cursor-pointer rounded-full z-10 bg-white min-w-[3.5rem] min-h-[3.5rem]">
						<Image
							alt={t("altProfilePicture")}
							className="rounded-full object-contain"
							height={45}
							src={post?.creator?.image ?? logo}
							width={45}
						/>
					</div>
					<div className="flex flex-col max-w-[100%] overflow-hidden gap-1">
						<h3 className="font-satoshi font-semibold text-mlt-dark-2 pr-7">
							{post?.creator?.name ?? t("defaultUsername")}
						</h3>

						<p className="font-inter text-mlt-dark-6 text-ellipsis overflow-hidden whitespace-pre">
							{post?.creator?.email.replace(/\./g, "-").replace(/@.*$/, t("spamProtect")) ??
								t("defaultEmail")}
						</p>
					</div>
				</div>

				<IconEmbedSvgPop
					c1="mlt-orange-secondary"
					c2="mlt-orange-dark"
					height={22}
					isActive={copied === post.prompt}
					op1="84"
					style={{ position: "absolute", right: "-6px", top: "-6px" }}
					text={t("altCopyPrompt")}
					type={copied === post.prompt ? "clipboard-check" : "clipboard"}
					width={22}
					onClick={handlePromptCopy}
				/>
			</div>

			{post?.image && (
				<div className="prompt_card_image_container">
					<Image
						alt={t("altPromptImage")}
						className="prompt_card_image"
						height={300}
						src={`/api/files/id/${post.image._id}`}
						width={300}
					/>
				</div>
			)}

			<div
				className={`prompt_card_prompt ${
					post?.image ? "-mt-6 prompt_card_prompt_wit_image" : "mt-6"
				}`}
			>
				<p className="prompt_card_prompt_text" onClick={handlePromptCopy}>
					{post.prompt}
				</p>
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
							type={"up-right-from-square"}
							width={18}
							wrapperClass="none"
						/>
					</a>
				)}
			</div>

			<p className="post_tags_list">
				{(post.tags as string[]).map((tag: string, index) => (
					<PostTag key={index} text={tag} onClick={() => handleTagClick && handleTagClick(tag)} />
				))}
			</p>
		</div>
	);
};

interface PromptCardListProps {
	data: PostTypeFromDb[];
	handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
	const [copied, setCopied] = useState("");

	// https://stackoverflow.com/a/46545530/6543935
	return (
		<>
			{data.map((post) => {
				if (!post || !post?.creator) {
					return null;
				}

				return (
					<PostCard
						key={post._id}
						copied={copied}
						handleTagClick={handleTagClick}
						post={post}
						setCopied={setCopied}
					/>
				);
			})}
		</>
	);
};

export default PromptCardList;
