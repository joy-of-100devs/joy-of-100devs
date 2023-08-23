import {ObjectId} from "bson";
import mongoose from "mongoose";

export interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    image?: string;
    imageCloudId?: string;
    emailVerified: boolean | null;
}

export type ISessionUser = Pick<IUser, "name"|"email"|"image">

export const DB_NAME = "User";
export const COLLECTION_NAME = "users";

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: "String",
        required: true,
    },
    email: {
        type: "String",
        required: true,
    },
    image: {
        type: "String",
    },
    imageCloudId: {
        type: "String",
    },
    emailVerified: {
        type: "Boolean",
    }
});

const User: mongoose.Model<IUser> = mongoose.models[DB_NAME] || mongoose.model(DB_NAME, UserSchema, COLLECTION_NAME);
export default User;
