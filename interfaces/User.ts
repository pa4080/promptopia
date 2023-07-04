export interface UserType {
	email: string;
	username: string;
	name: string;
	image: string;
	accountProvider: string;
	description?: string;
}

export interface UserTypeFromDb extends UserType {
	_id: string;
}
