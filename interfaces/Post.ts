import { GridFSFile } from "mongodb";

import { UserTypeFromDb } from "@/interfaces/User";

export interface PostType {
	prompt: string;
	tags: string[];
	link: string;
	aiModelType: AiModelTypes;
}

export interface PostTypeFromDb extends PostType {
	_id: string;
	creator: UserTypeFromDb;
	image: GridFSFile;
}

export enum AiModelTypes {
	GPT = "gpt",
	SD = "stableDiffusion",
}

export const postInit: PostType = {
	prompt: "",
	tags: [],
	aiModelType: AiModelTypes.GPT,
	link: "",
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
