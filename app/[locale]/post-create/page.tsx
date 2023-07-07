"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import {
	AiCategories,
	PostType,
	PostErrorsType,
	postInit,
	PostTypeFromDb,
} from "@/interfaces/Post";
import { FormTypes } from "@/interfaces/Form";
import Form from "@/components/Form";
import { Path } from "@/interfaces/Path";
import { preparePostBodyToUpload, uploadOrReplaceImage } from "@/lib/fetch-helpers";
import { usePromptopiaContext } from "@/contexts/PromptopiaContext";

const CreatePost_Page: React.FC = () => {
	const t = useTranslations("CreatePost");
	const router = useRouter();
	const { setPosts, session } = usePromptopiaContext();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState<PostType | PostTypeFromDb>(postInit);
	const [errors, setErrors] = useState<PostErrorsType>(null!);
	const [formDataToUpload, setFormDataToUpload] = useState<FormData | undefined>(undefined);
	const [postImageFilename, setPostImageFilename] = useState<string | null>(null);

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
			// "fileToUpload" is a name of a form field. The form can have multiple fields.
			// formData.forEach((value, key) => { console.log({ [key]: value }); });

			setFormDataToUpload(formData);
			setPostImageFilename(promptFile.name);
		}
	};

	const createPost = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitting(true);

		if (post.aiCategory === AiCategories.IMAGE && !formDataToUpload) {
			setErrors((prevErrors) => ({ ...prevErrors, image: { message: t("imageRequiredError") } }));
			setSubmitting(false);

			return;
		} else if (post.aiCategory === AiCategories.IMAGE && formDataToUpload) {
			setErrors((prevErrors) => clearSpecificError(prevErrors, "image"));
		}

		const image_id: string | null = await uploadOrReplaceImage({
			formDataToUpload,
			postImageFilename,
			post,
		});

		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				body: preparePostBodyToUpload({
					post,
					image_id,
					user_id: session?.user.id, // can be skipped on PUT/Update
				}),
			});

			if (response.ok) {
				const newPost = (await response.json()).post;

				setPosts((prevPosts) => [...prevPosts, newPost]);
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
			handleSubmit={createPost}
			post={post}
			postImageFilename={postImageFilename}
			setPost={setPost}
			submitting={submitting}
			type={FormTypes.CREATE}
		/>
	);
};

export default CreatePost_Page;
