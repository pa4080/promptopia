/**
 * @see https://youtu.be/wm5gMKuwSYk?t=7575
 */
import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
	creator: {
		// This is the database ObjectId
		// of the user who created the prompt,
		// it should be the same as the userId.
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	prompt: {
		type: String,
		required: [true, "Prompt is required!"],
	},
	tags: {
		type: Array,
		required: [true, "At least one Tag is required!"],
	},
	aiModelType: {
		type: String, // actually it is a value of AiModelTypes
		required: [true, "AI-Model type is required!"],
	},
	link: {
		type: String,
		match: [/^https:\/\//, "You need to use https:// for the Link!"],
	},
	image: {
		type: Schema.Types.ObjectId,
		ref: "GridFS",
	},
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
