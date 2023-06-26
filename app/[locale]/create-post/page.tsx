"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import slugify from "slugify";

import { AiModelTypes, PostType, PostErrorsType, postInit } from "@/interfaces/Post";
import { FormTypes } from "@/interfaces/Form";
import Form from "@/app/components/Form";

const CreatePost: React.FC = () => {
	const t = useTranslations("CreatePost");
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState<PostType>(postInit);
	const [errors, setErrors] = useState<PostErrorsType>(null!);
	const [formDataToUpload, setFormDataToUpload] = useState<FormData | undefined>(undefined);
	const [postImageFilename, setPostImageFilename] = useState<string | null>(null);

	const clearSpecificError_useStateCb = (
		prevErrors: PostErrorsType,
		errorKey: keyof PostErrorsType
	) => {
		// https://stackoverflow.com/q/63702057/6543935
		let prevErrorsCopy = { ...prevErrors } as Partial<PostErrorsType>;

		if (Object.keys(prevErrors)?.length === 0) {
			prevErrorsCopy = null!;
		} else if (Object.keys(prevErrors?.[errorKey])?.length > 0) {
			delete prevErrorsCopy[errorKey];
		}

		return prevErrorsCopy as PostErrorsType;
	};
	const handleChange_FileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.currentTarget.files?.length && e.currentTarget.files?.length > 0) {
			const promptFile: File = e.currentTarget.files[0];

			if (promptFile.size > 131072) {
				setPostImageFilename(promptFile.name);

				setErrors((prevErrors) => ({ ...prevErrors, image: { message: t("imageSizeError") } }));

				return;
			} else if (promptFile.size <= 131072) {
				setErrors((prevErrors) => clearSpecificError_useStateCb(prevErrors, "image"));
			}

			const formData = new FormData();

			formData.append("fileToUpload", promptFile);
			/**
			 * "fileToUpload" is a name of the form field.
			 * The form can have multiple fields.
			 * We can loop through the fields like this:
			 * 
			 formData.forEach((value, key) => {
				 console.log({ [key]: value });
			 });
			 */

			setFormDataToUpload(formData);
			setPostImageFilename(promptFile.name);
		}
	};

	const createPost = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitting(true);

		if (post.aiModelType === AiModelTypes.SD && !formDataToUpload) {
			setErrors((prevErrors) => ({ ...prevErrors, image: { message: t("imageRequiredError") } }));
			setSubmitting(false);

			return;
		} else if (post.aiModelType === AiModelTypes.SD && formDataToUpload) {
			setErrors((prevErrors) => clearSpecificError_useStateCb(prevErrors, "image"));
		}

		let image_id: string | null = null;

		if (formDataToUpload) {
			const postImageFnToUpload = slugify(String(postImageFilename), {
				lower: true,
				remove: /[*+~()'"!:@]/g,
				locale: "en",
			});
			const fileToRename = formDataToUpload.get("fileToUpload") as File;

			formDataToUpload.set("fileToUpload", fileToRename, postImageFnToUpload);
			const response = await fetch("/api/files", {
				method: "POST",
				body: formDataToUpload,
			});

			if (response.ok) {
				image_id = (await response.json())[0]._id;
			}

			// eslint-disable-next-line no-console
			console.log(
				`Upload of "${postImageFnToUpload} (_id: ${image_id})" is ${
					response ? "successful!" : "not successful."
				}`
			);
		}

		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				body: JSON.stringify({
					...post,
					tags: String(post.tags)
						.split(",")
						.map((tag) => tag.trim()),
					image: image_id,
					creator: session?.user.id,
				}),
			});

			if (response.ok) {
				router.push("/");
			} else {
				/**
				 * The error handling here should be a bit
				 * complex in order to apply the translations.
				 * At all it is better to make a complete
				 * check on the FE, before fetch the API.
				 */
				setErrors((await response.json()).errors);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log(errors);
	}, [errors]);

	return (
		<Form
			errors={errors}
			handleChange_FileUpload={handleChange_FileUpload}
			handleSubmit={createPost}
			post={post}
			postImageFilename={postImageFilename}
			setPost={setPost}
			submitting={submitting}
			type={FormTypes.CREATE}
		/>
	);
};

export default CreatePost;
