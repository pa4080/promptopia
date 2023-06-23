import { PostType } from "@/interfaces/Post";

export interface FormProps {
	handleSubmit: (e: React.SyntheticEvent) => void;
	post: PostType;
	setPost: React.Dispatch<React.SetStateAction<PostType>>;
	submitting: boolean;
	type: FormTypes;
}

export enum FormTypes {
	CREATE = "create",
	EDIT = "edit",
}
