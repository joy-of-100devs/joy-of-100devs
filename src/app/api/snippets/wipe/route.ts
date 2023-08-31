import {withMiddleware} from "@/lib/api";
import {UnauthorizedError} from "@/lib/errors";
import * as snippetRepo from "@/domains/snippets/repository";
import {ObjectId} from "@/helpers/abbreviations";
import {z} from "zod";

export const DELETE = withMiddleware(async function (request) {
    if (!request.user) {
        throw new UnauthorizedError();
    }
    const url = new URL(request.url);
    await snippetRepo.deleteAllSnippetsInRepository({
        userId: new ObjectId(request.user._id),
        repository: z.string().nonempty().parse(url.searchParams.get("repository")),
    });
    return {};
});
