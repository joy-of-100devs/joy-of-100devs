import {ObjectId} from "bson";
import mongoose from "mongoose";

export interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    image?: string;
    imageCloudId?: string;
    emailVerified: boolean|null;
}

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

const User = mongoose.model<IUser>(DB_NAME, UserSchema, COLLECTION_NAME);
export default User;
