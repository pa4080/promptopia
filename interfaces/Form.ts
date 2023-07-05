import { PostType, PostErrorsType, PostTypeFromDb } from "@/interfaces/Post";

export interface FormProps {
	handleSubmit: (e: React.SyntheticEvent) => void;
	handleFileUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	post: PostType | PostTypeFromDb;
	setPost: React.Dispatch<React.SetStateAction<PostType | PostTypeFromDb>>;
	submitting: boolean;
	type: FormTypes;
	errors: PostErrorsType | null;
	postImageFilename: string | null;
}

export enum FormTypes {
	CREATE = "create",
	EDIT = "edit",
}
