import {ObjectId} from "@/helpers/abbreviations";
import Snippet from "@/domains/snippets/model";

export async function getAllSnippetsInRepository(params: {
    userId: ObjectId,
    repository: string,
}): Promise<Record<string, string|null>> {
    const snippets= await Snippet.find({
        user: params.userId,
        repository: params.repository,
    });
    const result: Record<string, string|null> = {};
    for await (let snippet of snippets) {
        result[snippet.filename] = snippet.content;
    }
    return result;
}


export async function deleteAllSnippetsInRepository(params: {
    userId: ObjectId,
    repository: string,
}) {
    await Snippet.deleteMany({
        user: params.userId,
        repository: params.repository,
    });
}

export async function saveSnippetToRepository(params: {
    userId: ObjectId,
    repository: string,
    filename: string,
    content: string|null,
}) {
    return Snippet.findOneAndUpdate({
        repository: params.repository,
        user: params.userId,
        filename: params.filename,
    }, {
        $set: {
            filename: params.filename,
            repository: params.repository,
            user: params.userId,
            content: params.content,
        }
    }, {
        upsert: true,
        new: true,
        runValidators: true,
    });
}
