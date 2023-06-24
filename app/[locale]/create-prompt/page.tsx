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

	const createPost = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				body: JSON.stringify({
					...post,
					tags: post.tags.map((tag) => tag.trim()),
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

	return (
		<Form
			errors={errors}
			handleSubmit={createPost}
			post={post}
			setPost={setPost}
			submitting={submitting}
			type={FormTypes.CREATE}
		/>
	);
};

export default CreatePost;
