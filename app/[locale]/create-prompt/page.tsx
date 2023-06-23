"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/app/components/Form";
import { PostType, postInit } from "@/interfaces/Post";

import { FormTypes } from "@/interfaces/Form";

const CreatePost: React.FC = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState<PostType>(postInit);

	const createPost = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch("/api/posts/new", {
				method: "POST",
				body: JSON.stringify({
					...post,
					userId: session?.user.id,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			handleSubmit={createPost}
			post={post}
			setPost={setPost}
			submitting={submitting}
			type={FormTypes.CREATE}
		/>
	);
};

export default CreatePost;
