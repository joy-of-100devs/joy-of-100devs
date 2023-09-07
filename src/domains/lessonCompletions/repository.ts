import {ObjectId} from "@/helpers/abbreviations";
import LessonCompletion from "@/domains/lessonCompletions/model";

export async function completeLesson(params: {
    userId: ObjectId,
    lessonId: ObjectId,
}) {
    return LessonCompletion.findOneAndUpdate({
        lesson: params.lessonId,
        user: params.userId,
    }, {
        $set: {
            lesson: params.lessonId,
            user: params.userId,
        }
    }, {
        upsert: true,
        new: true,
        runValidators: true,
    });
}

export async function getCompletionDataOfMultipleLessons(params: {
    userId: ObjectId;
    lessonIds: ObjectId[],
}) {
    return LessonCompletion.find({
        user: params.userId,
        lesson: {
            $in: params.lessonIds,
        }
    })
}

export async function checkCompletionOfLesson(params: {
    userId: ObjectId;
    lessonId: ObjectId;
}) {
    return !!(await LessonCompletion.findOne({
        user: params.userId,
        lesson: params.lessonId,
    }))
}
