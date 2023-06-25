import { UserTypeFromDb } from "@/interfaces/User";

export interface PostType {
	prompt: string;
	tags: string[] | string;
	link: string;
	aiModelType: AiModelTypes;
	image: string;
}

export interface PostTypeFromDb extends PostType {
	_id: string;
	creator: UserTypeFromDb;
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
	image: "",
};

export type PostTypeApiRespError = {
	[key in keyof PostType]: {
		kind: string; // "regexp", "required", etc.
		message: string; // the actual error message
		name: string; // ValidatorError
		path: string; // image, link, etc.
		properties: {}; // contains the same information as the other fields
		value: string; // the actual value that caused the error
	};
};
