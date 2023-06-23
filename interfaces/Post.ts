export interface PostType {
	prompt: string;
	tags: string[];
	link: string;
	model: ModelsAI;
}

enum ModelsAI {
	GPT = "GPT",
	SD = "Stable_Diffusion",
}

export const postInit: PostType = {
	prompt: "",
	tags: [],
	model: ModelsAI.GPT,
	link: "",
};
