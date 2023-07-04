// Ref.: https://youtu.be/wm5gMKuwSYk?t=5477
// Ref. regexp: https://gist.githubusercontent.com/adrianhajdin/6df61c6cd5ed052dce814a765bff9032/raw/3964dff2483e7aded3c567df1fb0b3f90a74b0aa/user.js
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		required: [true, "Email is required!"],
		unique: [true, "Email already exists!"],
	},
	username: {
		type: String,
		required: [true, "Username is required!"],
		match: [
			/^(?=.{4,84}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Username is invalid, it should contain 4-84 alphanumeric letters and be unique!",
		],
	},
	name: {
		type: String,
	},
	image: {
		type: String,
	},
	accountProvider: {
		type: String,
		required: [true, "Account provider is required!"],
	},
	description: {
		type: String,
	},
});

/**
 * For a regular  always on always 
 * running backend server (as express.js),
 * we would do something like this:
 * 
const User = model("User", UserSchema);
export default User;
*/

/**
 * For the Next.js API Routes, and serverless functions
 * we need something like below. Note "models" object,
 * provided by the mongoose library stores
 * all the registered models.
 */
const User = models.User || model("User", UserSchema);
export default User;
