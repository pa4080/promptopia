"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { Session } from "next-auth";

import { BuiltInProviderType } from "next-auth/providers";

import { PostTypeFromDb } from "@/interfaces/Post";
import { fetchPosts } from "@/lib/fetch-helpers";
import { UserTypeFromDb } from "@/interfaces/User";

type AuthProvidersType = Record<
	LiteralUnion<BuiltInProviderType, string>,
	ClientSafeProvider
> | null;

interface PromptopiaContextProps {
	posts: PostTypeFromDb[];
	setPosts: React.Dispatch<React.SetStateAction<PostTypeFromDb[]>>;
	users: UserTypeFromDb[];
	setUsers: React.Dispatch<React.SetStateAction<UserTypeFromDb[]>>;
	authProviders: AuthProvidersType;
	session: Session | null;
	postCardListSize: number;
	setPostCardListSize: React.Dispatch<React.SetStateAction<number>>;
}

const PromptopiaContext = createContext<PromptopiaContextProps>({} as PromptopiaContextProps);

interface PromptopiaContextProviderProps {
	children: React.ReactNode;
}

export const PromptopiaContextProvider: React.FC<PromptopiaContextProviderProps> = ({
	children,
}) => {
	const [posts, setPosts] = useState<PostTypeFromDb[]>([]);
	const [users, setUsers] = useState<UserTypeFromDb[]>([]);
	const [authProviders, setAuthProviders] = useState<AuthProvidersType>(null);
	const [postCardListSize, setPostCardListSize] = useState(0);
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
				users,
				setUsers,
				authProviders,
				session,
				postCardListSize,
				setPostCardListSize,
			}}
		>
			{children}
		</PromptopiaContext.Provider>
	);
};

export const usePromptopiaContext = () => useContext(PromptopiaContext);
