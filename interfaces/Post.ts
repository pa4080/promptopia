export interface Post {
	prompt: string;
	tags: string[];
	link: string;
}

export const postInit: Post = {
	prompt: "",
	tags: [],
	link: "",
};
