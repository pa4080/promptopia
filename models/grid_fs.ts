/**
 * @see https://stackoverflow.com/questions/32073183/mongodb-populate-gridfs-files-metadata-in-parent-document
 */
import { Schema, model, models } from "mongoose";

const MONGODB_FILES_BUCKET_NAME = process.env.MONGODB_FILES_BUCKET_NAME;

export const GridFS =
	models.GridFS ||
	model("GridFS", new Schema({}, { strict: false }), `${MONGODB_FILES_BUCKET_NAME}.files`);
