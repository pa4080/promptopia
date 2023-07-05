import { PostTypeFromDb } from "./Post";
import { UserTypeFromDb } from "./User";

export interface UserProfileType {
	user: UserTypeFromDb;
	posts: PostTypeFromDb[];
}
