import { Post } from "@/interfaces/Post";

export interface FormProps {
	handleSubmit: (e: React.SyntheticEvent) => void;
	post: Post;
	setPost: React.Dispatch<React.SetStateAction<Post>>;
	submitting: boolean;
	type: FormTypes;
}

export enum FormTypes {
	CREATE = "create",
	EDIT = "edit",
}
