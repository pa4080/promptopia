import { GridFSFile } from "mongodb";

import { UserTypeFromDb } from "@/interfaces/User";

export interface PostType {
	prompt: string;
	tags: string; // tags: string[] | string;
	link: string;
	aiCategory: AiCategories;
}

// Omit: https://stackoverflow.com/a/51507473/6543935
export interface PostTypeFromDb extends Omit<PostType, "tags"> {
	_id: string;
	tags: string[];
	creator: UserTypeFromDb;
	image: GridFSFile;
}

export enum AiCategories {
	CHAT = "chat",
	IMAGE = "image",
}

export enum SearchTypes {
	AUTHOR = "author",
	TAGS = "tags",
	PROMPT = "prompt",
}

export const postInit: PostType = {
	prompt: "",
	tags: "",
	aiCategory: AiCategories.CHAT,
	link: "",
};

export const postFromDbInit: PostTypeFromDb = {
	prompt: "Prompt placeholder...",
	tags: ["tag1", "tag2"],
	aiCategory: AiCategories.CHAT,
	link: "",
	_id: "",
	creator: {} as UserTypeFromDb,
	image: {} as GridFSFile,
};

export type PostErrorsType = {
	// [key: string]: {}
	[key in keyof PostTypeFromDb]: {
		kind?: string; // "regexp", "required", etc.
		message?: string; // the actual error message
		name?: string; // ValidatorError
		path?: string; // image, link, etc.
		properties?: {}; // contains the same information as the other fields
		value?: string; // the actual value that caused the error
	};
};
