"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { PostTypeFromDb } from "@/interfaces/Post";
import { fetchPosts } from "@/lib/fetch-helpers";

interface PromptopiaContextProps {
	posts: PostTypeFromDb[];
}

const PromptopiaContext = createContext<PromptopiaContextProps>({} as PromptopiaContextProps);

interface PromptopiaContextProviderProps {
	children: React.ReactNode;
}

export const PromptopiaContextProvider: React.FC<PromptopiaContextProviderProps> = ({
	children,
}) => {
	const [posts, setPosts] = useState<PostTypeFromDb[]>([]);

	useEffect(() => {
		(async () => {
			setPosts(await fetchPosts("/api/posts"));
		})();
	}, []);

	return (
		<PromptopiaContext.Provider
			value={{
				posts,
			}}
		>
			{children}
		</PromptopiaContext.Provider>
	);
};

export const usePromptopiaContext = () => useContext(PromptopiaContext);
