import {withMiddleware} from "@/lib/api";
import * as snippetRepo from '@/domains/snippets/repository';
import {UnauthorizedError} from "@/lib/errors";
import {ObjectId} from "@/helpers/abbreviations";
import {z} from "zod";

export const PUT = withMiddleware(async function (request) {
    if (!request.user) {
        throw new UnauthorizedError();
    }
    const json = await request.json();
    await snippetRepo.saveSnippetToRepository({
        userId: new ObjectId(request.user._id),
        filename: z.string().nonempty().parse(json.filename),
        repository: z.string().nonempty().parse(json.repository),
        content: z.string().nullable().parse(json.content),
    });
    return {};
});

