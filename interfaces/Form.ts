import { PostType, PostErrorsType } from "@/interfaces/Post";

export interface FormProps {
	handleSubmit: (e: React.SyntheticEvent) => void;
	handleChange_FileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	post: PostType;
	setPost: React.Dispatch<React.SetStateAction<PostType>>;
	submitting: boolean;
	type: FormTypes;
	errors: PostErrorsType | null;
	postImageFilename: string | null;
}

export enum FormTypes {
	CREATE = "create",
	EDIT = "edit",
}
