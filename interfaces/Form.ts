import { PostType, PostTypeApiRespError } from "@/interfaces/Post";

export interface FormProps {
	handleSubmit: (e: React.SyntheticEvent) => void;
	post: PostType;
	setPost: React.Dispatch<React.SetStateAction<PostType>>;
	submitting: boolean;
	type: FormTypes;
	errors: PostTypeApiRespError | null;
}

export enum FormTypes {
	CREATE = "create",
	EDIT = "edit",
}
