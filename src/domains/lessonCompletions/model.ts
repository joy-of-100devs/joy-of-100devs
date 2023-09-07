import {ObjectId} from "bson";
import mongoose from "mongoose";
import {MODEL_NAME as USER_MODEL_NAME} from "@/domains/users/model";

export interface ILessonCompletion {
    _id: ObjectId;
    user: ObjectId;
    lesson: ObjectId;
}

export const MODEL_NAME = "LessonCompletion";
export const COLLECTION_NAME = "lessoncompletions";

const LessonCompletionSchema = new mongoose.Schema<ILessonCompletion>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL_NAME,
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

LessonCompletionSchema.index({lesson: 1, user: 1}, {unique: true});

const LessonCompletion: mongoose.Model<ILessonCompletion> = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, LessonCompletionSchema, COLLECTION_NAME);
export default LessonCompletion;
