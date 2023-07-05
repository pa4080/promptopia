"use client";
import React, { use, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";

import { fetchPosts, preparePostBodyToUpload, uploadOrReplaceImage } from "@/lib/fetch-helpers";

import {
	AiCategories,
	PostErrorsType,
	PostType,
	PostTypeFromDb,
	postFromDbInit,
} from "@/interfaces/Post";
import { FormTypes } from "@/interfaces/Form";
import Form from "@/app/components/Form";
import { Path } from "@/interfaces/Path";
import PostCardList from "@/app/components/PostCardList";
import Header from "@/app/components/Header";
import PostCard from "@/app/components/PostCard";

const DeletePost_Page: React.FC = () => {
	const t = useTranslations("DeletePost");
	const tForm = useTranslations("Form");
	const router = useRouter();
	const { data: session } = useSession();
	const [copied, setCopied] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState<PostTypeFromDb>(postFromDbInit);
	const [postImageFilename, setPostImageFilename] = useState<string | null>(null);
	const i18nFormType = { type: tForm(`Types.delete`) };

	const searchParams = useSearchParams();
	const postId = searchParams.get("id");

	useEffect(() => {
		if (!session || !session?.user?.id) {
			router.push(Path.HOME);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => {
			setPost((await fetchPosts(`/api/posts/${postId}`))[0]);
		})();
	}, [postId]);

	useEffect(() => {
		if (post) {
			setPostImageFilename((post as PostTypeFromDb)?.image?.filename || null);
		}
	}, [post]);

	const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		const hasConfirmed = confirm(t("description"));

		if (hasConfirmed) {
			try {
				const imageId = (post as PostTypeFromDb)?.image?._id;
				const postId = (post as PostTypeFromDb)?._id;

				if (imageId) {
					const imgDelResponse = await fetch(`/api/files/${imageId}`, {
						method: "DELETE",
					});

					if (!imgDelResponse.ok) {
						throw new Error(`Could not delete image id:${imageId}`);
					}
				}

				if (postId) {
					const postDelResponse = await fetch(`/api/posts/${postId}`, {
						method: "DELETE",
					});

					if (!postDelResponse.ok) {
						throw new Error(`Could not delete post id:${postId}`);
					}
				} else {
					throw new Error(`Could not delete post id:${postId}`);
				}

				setSubmitting(false);
				router.push(Path.PROFILE);
			} catch (error) {
				console.error("Something went wrong on post delete:", error);
			}
		} else {
			setSubmitting(false);

			return;
		}
	};

	return (
		<section className="page_section_left w-fit max-w-3xl">
			<Header
				desc={t("description")}
				gradient="red_gradient"
				textStyle="text-left"
				titleGradient={t("title", { id: `${post._id.slice(0, 3)}...${post._id.slice(-3)}` })}
			/>
			<form className="mt-10 w-full" onSubmit={handleDeleteSubmit}>
				<div className="flex justify-end items-center gap-4 flex-row w-full mb-8">
					<Link
						className="text-sm text-mlt-dark-4 hover:text-mlt-purple-primary"
						href={Path.PROFILE}
					>
						{tForm("cancel")}
					</Link>
					<button className="_btn red_invert" disabled={submitting} type="submit">
						{submitting ? tForm("processing", i18nFormType) : tForm("submit", i18nFormType)}
					</button>
				</div>

				<div className="max-w-md">
					<PostCard copied={copied} post={post} setCopied={setCopied} />
				</div>
			</form>
		</section>
	);
};

export default DeletePost_Page;
