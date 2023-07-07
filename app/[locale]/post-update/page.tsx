"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import { fetchPosts, preparePostBodyToUpload, uploadOrReplaceImage } from "@/lib/fetch-helpers";

import {
	AiCategories,
	PostErrorsType,
	PostType,
	PostTypeFromDb,
	postFromDbInit,
} from "@/interfaces/Post";
import { FormTypes } from "@/interfaces/Form";
import Form from "@/components/Form";
import { Path } from "@/interfaces/Path";
import { usePromptopiaContext } from "@/contexts/PromptopiaContext";

const UpdatePost_Page: React.FC = () => {
	const t = useTranslations("CreatePost");
	const router = useRouter();
	const { posts, setPosts } = usePromptopiaContext();
	const [postToEdit, setPostToEdit] = useState<PostType | PostTypeFromDb>(postFromDbInit);
	const [submitting, setSubmitting] = useState(false);
	const [errors, setErrors] = useState<PostErrorsType>(null!);
	const [formDataToUpload, setFormDataToUpload] = useState<FormData | undefined>(undefined);
	const [postImageFilename, setPostImageFilename] = useState<string | null>(null);

	const searchParams = useSearchParams();
	const postId = searchParams.get("id");

	useEffect(() => {
		const findPost =
			postId && posts && (posts.find((post) => post._id === postId) as PostTypeFromDb);

		if (findPost) {
			setPostToEdit(findPost);
		} else {
			// If the post is not in the context, fetch it from the db...
			// TODO: ...this looks like a nonsense and likely to be deleted!
			(async () => {
				postId && setPostToEdit((await fetchPosts(`/api/posts/${postId}`))[0]);
			})();
		}
	}, [postId, posts]);

	useEffect(() => {
		if (postToEdit) {
			setPostImageFilename((postToEdit as PostTypeFromDb)?.image?.filename || null);
		}
	}, [postToEdit]);

	const clearSpecificError = (prevErrors: PostErrorsType, errorKey: keyof PostErrorsType) => {
		if (!prevErrors) {
			return null!;
		}

		// https://stackoverflow.com/q/63702057/6543935
		let prevErrorsCopy = { ...prevErrors } as Partial<PostErrorsType>;

		if (Object.keys(prevErrors)?.length === 0) {
			prevErrorsCopy = null!;
		} else if (Object.keys(prevErrors?.[errorKey])?.length > 0) {
			delete prevErrorsCopy[errorKey];
		}

		return prevErrorsCopy as PostErrorsType;
	};

	const handleFileUploadChange = async (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.currentTarget.files?.length && e.currentTarget.files?.length > 0) {
			const promptFile: File = e.currentTarget.files[0];

			if (promptFile.size > 131072) {
				setPostImageFilename(promptFile.name);

				setErrors((prevErrors) => ({ ...prevErrors, image: { message: t("imageSizeError") } }));

				return;
			} else if (promptFile.size <= 131072) {
				setErrors((prevErrors) => clearSpecificError(prevErrors, "image"));
			}

			const formData = new FormData();

			formData.append("fileToUpload", promptFile);
			setFormDataToUpload(formData);
			setPostImageFilename(promptFile.name);
		}
	};

	const updatePost = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitting(true);

		if (
			postToEdit.aiCategory === AiCategories.IMAGE &&
			!formDataToUpload &&
			!(postToEdit as PostTypeFromDb).image
		) {
			setErrors((prevErrors) => ({ ...prevErrors, image: { message: t("imageRequiredError") } }));
			setSubmitting(false);

			return;
		} else if (postToEdit.aiCategory === AiCategories.IMAGE && formDataToUpload) {
			setErrors((prevErrors) => clearSpecificError(prevErrors, "image"));
		}

		const image_id: string | null = await uploadOrReplaceImage({
			formDataToUpload,
			postImageFilename,
			post: postToEdit,
		});

		try {
			const response = await fetch(`/api/posts/${postId}`, {
				method: "PUT",
				body: preparePostBodyToUpload({
					post: postToEdit,
					image_id,
					user_id: (postToEdit as PostTypeFromDb).creator._id,
				}),
			});

			if (response.ok) {
				const updatedPost = (await response.json()).post;

				setPosts(
					posts.map((post) => (post._id !== postId ? post : updatedPost)) as PostTypeFromDb[]
				);
				router.push(Path.HOME);
			} else {
				// The error handling here should be a bit complex in order to apply the translations.
				// At all it is better to make a complete check on the FE, before fetch the API.
				setErrors((await response.json()).errors);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			errors={errors}
			handleFileUploadChange={handleFileUploadChange}
			handleSubmit={updatePost}
			post={postToEdit}
			postImageFilename={postImageFilename}
			setPost={setPostToEdit}
			submitting={submitting}
			type={FormTypes.EDIT}
		/>
	);
};

export default UpdatePost_Page;
