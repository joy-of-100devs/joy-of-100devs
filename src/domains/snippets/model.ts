import {ObjectId} from "bson";
import mongoose from "mongoose";
import {MODEL_NAME as USER_MODEL_NAME} from "@/domains/users/model";

export interface ISnippet {
    _id: ObjectId;
    user: ObjectId;
    repository: string;
    filename: string;
    content: string|null;
}

export const MODEL_NAME = "Snippet";
export const COLLECTION_NAME = "snippets";

const SnippetSchema = new mongoose.Schema<ISnippet>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL_NAME,
    },
    content: {
        type: "String",
        required: false,
    },
});

const User: mongoose.Model<ISnippet> = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, SnippetSchema, COLLECTION_NAME);
export default User;
