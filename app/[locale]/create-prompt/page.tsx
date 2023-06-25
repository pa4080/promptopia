"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import slugify from "slugify";

import Form from "@/app/components/Form";
import { AiModelTypes, PostType, PostTypeApiRespError, postInit } from "@/interfaces/Post";

import { FormTypes } from "@/interfaces/Form";
import { formDataUpload as doFormDataUpload } from "@/lib/functions/formDataUpload";

const CreatePost: React.FC = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState<PostType>(postInit);
	const [errors, setErrors] = useState<PostTypeApiRespError | null>(null);
	const [formDataToUpload, setFormDataToUpload] = useState<FormData | undefined>(undefined);

	const handleChange_FileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.currentTarget.files?.length && e.currentTarget.files?.length > 0) {
			const promptFile: File = e.currentTarget.files[0];
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
			setPost((prevPost) => ({ ...prevPost, image: promptFile.name }));
		}
	};

	const createPost = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitting(true);

		let postImageName: string = post.image;

		if (post.aiModelType === AiModelTypes.SD && !formDataToUpload) {
			// eslint-disable-next-line no-console
			console.log("No file to upload. Should this option be mandatory?");

			return;
		}

		if (formDataToUpload) {
			postImageName = slugify(post.image, { lower: true, remove: /[*+~()'"!:@]/g, locale: "en" });
			const fileToRename = formDataToUpload.get("fileToUpload") as File;

			formDataToUpload.set("fileToUpload", fileToRename, postImageName);
			const upload = await doFormDataUpload(formDataToUpload);

			// eslint-disable-next-line no-console
			console.log(`Upload of "${postImageName}" is ${upload ? "successful!" : "not successful."}`);
		}

		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				body: JSON.stringify({
					...post,
					tags: String(post.tags)
						.split(",")
						.map((tag) => tag.trim()),
					image: postImageName,
					userId: session?.user.id,
				}),
			});

			if (response.ok) {
				router.push("/");
			} else {
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
			setPost={setPost}
			submitting={submitting}
			type={FormTypes.CREATE}
		/>
	);
};

export default CreatePost;
