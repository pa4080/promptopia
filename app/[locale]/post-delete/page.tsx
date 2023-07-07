"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";

import { fetchPosts } from "@/lib/fetch-helpers";

import { PostTypeFromDb, postFromDbInit } from "@/interfaces/Post";
import { Path } from "@/interfaces/Path";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { usePromptopiaContext } from "@/contexts/PromptopiaContext";

const DeletePost_Page: React.FC = () => {
	const t = useTranslations("DeletePost");
	const tForm = useTranslations("Form");
	const router = useRouter();
	const { posts, setPosts } = usePromptopiaContext();
	const [copied, setCopied] = useState("");
	const [postToDelete, setPostToDelete] = useState<PostTypeFromDb>(postFromDbInit);
	const [submitting, setSubmitting] = useState(false);
	const i18nFormType = { type: tForm(`Types.delete`) };

	const searchParams = useSearchParams();
	const postId = searchParams.get("id");

	useEffect(() => {
		const findPost =
			postId && posts && (posts.find((post) => post._id === postId) as PostTypeFromDb);

		if (findPost) {
			setPostToDelete(findPost);
		} else {
			// If the post is not in the context, fetch it from the db...
			// TODO: ...this looks like a nonsense and likely to be deleted!
			(async () => {
				postId && setPostToDelete((await fetchPosts(`/api/posts/${postId}`))[0]);
			})();
		}
	}, [postId, posts]);

	const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		const hasConfirmed = confirm(t("description"));

		if (hasConfirmed) {
			try {
				const imageId = (postToDelete as PostTypeFromDb)?.image?._id;
				const postId = (postToDelete as PostTypeFromDb)?._id;

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

				setPosts(posts.filter((post) => post._id !== postId));
				router.push(Path.PROFILE);
			} catch (error) {
				console.error("Something went wrong on post delete:", error);
			} finally {
				setSubmitting(false);
			}
		} else {
			setSubmitting(false);

			return;
		}
	};

	return (
		postToDelete && (
			<section className="page_section_left w-fit max-w-3xl">
				<Header
					desc={t("description")}
					gradient="red_gradient"
					textStyle="text-left"
					titleGradient={t("title", {
						id: `${postToDelete._id.slice(0, 3)}...${postToDelete._id.slice(-3)}`,
					})}
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
						<PostCard copied={copied} post={postToDelete} setCopied={setCopied} />
					</div>
				</form>
			</section>
		)
	);
};

export default DeletePost_Page;
