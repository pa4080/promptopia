import { PostTypeFromDb } from "./Post";
import { UserTypeFromDb } from "./User";

export interface Profile {
	user: UserTypeFromDb;
	posts: PostTypeFromDb[];
	handleEdit: (e: React.SyntheticEvent) => void;
	handleDelete: (e: React.SyntheticEvent) => void;
}
