import { PostType, PostTypeApiRespError } from "@/interfaces/Post";

export interface FormProps {
	handleSubmit: (e: React.SyntheticEvent) => void;
	handleChange_FileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	post: PostType;
	setPost: React.Dispatch<React.SetStateAction<PostType>>;
	submitting: boolean;
	type: FormTypes;
	errors: PostTypeApiRespError | null;
	postImageFilename: string | null;
}

export enum FormTypes {
	CREATE = "create",
	EDIT = "edit",
}
