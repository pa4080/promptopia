import { UserTypeFromDb } from "@/interfaces/User";

export interface PostType {
	prompt: string;
	tags: string[];
	link: string;
	aiModelType: aiModelsTypes;
	image: string;
}

export interface PostTypeFromDb extends PostType {
	_id: string;
	creator: UserTypeFromDb;
}

enum aiModelsTypes {
	GPT = "gpt",
	SD = "stableDiffusion",
}

export const postInit: PostType = {
	prompt: "",
	tags: [],
	aiModelType: aiModelsTypes.GPT,
	link: "",
	image: "123",
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
