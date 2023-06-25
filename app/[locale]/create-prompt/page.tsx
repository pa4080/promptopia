"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/app/components/Form";
import { PostType, PostTypeApiRespError, postInit } from "@/interfaces/Post";

import { FormTypes } from "@/interfaces/Form";

const CreatePost: React.FC = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState<PostType>(postInit);
	const [errors, setErrors] = useState<PostTypeApiRespError | null>(null);
	const [fileName, setFileName] = useState<string | undefined>(undefined);

	const createPost = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				body: JSON.stringify({
					...post,
					tags: String(post.tags)
						.split(",")
						.map((tag) => tag.trim()),
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

	// const uploadFile = async (file: File) => {
	// 	const uploadFile = async (file: File) => {
	// };

	const fileUpload = async (formData: FormData) => {
		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		// eslint-disable-next-line no-console
		console.log(response);
	};

	const handleChange_FileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.files?.length && e.currentTarget.files?.length > 0) {
			e.preventDefault();

			const promptFile: File = e.currentTarget.files[0];
			// const promptFileURL = URL.createObjectURL(promptFile);
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

			await fileUpload(formData);
			setFileName(promptFile.name);
		}
	};

	return (
		<Form
			errors={errors}
			fileName={fileName}
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
