import { PostTypeFromDb } from "./Post";

export interface Profile {
	name: string;
	email: string;
	description: string;
	posts: PostTypeFromDb[];
	handleEdit: (e: React.SyntheticEvent) => void;
	handleDelete: (e: React.SyntheticEvent) => void;
}
