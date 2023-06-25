"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

import { PostTypeFromDb } from "@/interfaces/Post";
import logo from "@/public/icons/svg/mlt.promptopia.logo.favicon.svg";

interface Props {
	post: PostTypeFromDb;
	handleTagClick: (tag: string) => void;
	handleEdit?: (tag: string) => void;
	handleDelete?: (tag: string) => void;
}

const PostCard: React.FC<Props> = ({ post, handleTagClick }) => {
	const t = useTranslations("PostCard");

	if (!post || !post?.creator) {
		return null;
	}

	return (
		<div className="prompt-card">
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
						<h3>{post?.creator?.name}</h3>
						<p>{post?.creator?.email}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
