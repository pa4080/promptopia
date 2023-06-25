import { PostType, PostTypeApiRespError } from "@/interfaces/Post";

export interface FormProps {
	handleSubmit: (e: React.SyntheticEvent) => void;
	handleChange_FileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fileName: string | undefined;
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
