import {getServerSession} from "@/domains/users/repository";
import {ObjectId} from "@/helpers/abbreviations";
import LessonCompletion, {ILessonCompletion} from "@/domains/lessonCompletions/model";
import {HydratedDocument} from 'mongoose';

export async function getCompletionDataOfMultipleLessons(params: {
    lessonIds: ObjectId[],
}): Promise<HydratedDocument<ILessonCompletion>[]> {
    const session = await getServerSession();
    if (!session?.user) {
        return [];
    } else {
        return LessonCompletion.find({
            user: session.user._id,
            lesson: {
                $in: params.lessonIds,
            }
        });
    }
}
