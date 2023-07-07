"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { Session } from "next-auth";

import { BuiltInProviderType } from "next-auth/providers";

import { PostTypeFromDb } from "@/interfaces/Post";
import { fetchPosts } from "@/lib/fetch-helpers";

type AuthProvidersType = Record<
	LiteralUnion<BuiltInProviderType, string>,
	ClientSafeProvider
> | null;

interface PromptopiaContextProps {
	posts: PostTypeFromDb[];
	setPosts: React.Dispatch<React.SetStateAction<PostTypeFromDb[]>>;
	authProviders: AuthProvidersType;
	session: Session | null;
}

const PromptopiaContext = createContext<PromptopiaContextProps>({} as PromptopiaContextProps);

interface PromptopiaContextProviderProps {
	children: React.ReactNode;
}

export const PromptopiaContextProvider: React.FC<PromptopiaContextProviderProps> = ({
	children,
}) => {
	const [posts, setPosts] = useState<PostTypeFromDb[]>([]);
	const [authProviders, setAuthProviders] = useState<AuthProvidersType>(null);
	const { data: session } = useSession();

	useEffect(() => {
		(async () => {
			setAuthProviders(await getProviders());
			setPosts(await fetchPosts("/api/posts"));
		})();
	}, []);

	return (
		<PromptopiaContext.Provider
			value={{
				posts,
				setPosts,
				authProviders,
				session,
			}}
		>
			{children}
		</PromptopiaContext.Provider>
	);
};

export const usePromptopiaContext = () => useContext(PromptopiaContext);
