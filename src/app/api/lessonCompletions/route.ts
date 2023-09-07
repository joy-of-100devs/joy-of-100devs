import {withMiddleware} from "@/lib/api";
import * as completionRepo from '@/domains/lessonCompletions/repository';
import {UnauthorizedError} from "@/lib/errors";
import {ObjectId} from "@/helpers/abbreviations";
import {z} from "zod";

export const PUT = withMiddleware(async function (request) {
    if (!request.user) {
        throw new UnauthorizedError();
    }
    const json = await request.json();
    return await completionRepo.completeLesson({
        userId: new ObjectId(request.user._id),
        lessonId: new ObjectId(z.string().nonempty().parse(json.lessonId)),
    });
});

