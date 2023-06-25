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

	const handleChange_UploadFile = async (e: React.FormEvent<HTMLInputElement>) => {
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
		// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
		// (e) => setPost({ ...post, image: e.target.value })

		if (e.currentTarget.files?.length && e.currentTarget.files?.length > 0) {
			e.preventDefault();

			const promptFile: File = e.currentTarget.files[0];
			// const promptFileURL = URL.createObjectURL(promptFile);
			const formData = new FormData();

			formData.append("fileToUpload", promptFile);
			formData.forEach((value, key) => {
				// eslint-disable-next-line no-console
				console.log({ [key]: value });
			});

			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			// eslint-disable-next-line no-console
			console.log(response);

			setFileName(promptFile.name);
		}
	};

	return (
		<Form
			errors={errors}
			fileName={fileName}
			handleChange_UploadFile={handleChange_UploadFile}
			handleSubmit={createPost}
			post={post}
			setPost={setPost}
			submitting={submitting}
			type={FormTypes.CREATE}
		/>
	);
};

export default CreatePost;
