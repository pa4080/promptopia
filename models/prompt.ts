// Ref.: https://youtu.be/wm5gMKuwSYk?t=7575
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
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
	link: {
		type: String,
		required: false,
		match: [/^https:\/\//, "You need to use https:// for the link!"],
	},
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
