import * as React from 'react';
import {loadModuleInfo} from "@/helpers/lessonHelper";
import path from "path";
import ClientLessonCompletionButton from "@/components/LessonCompletionButton/ClientLessonCompletionButton";

async function LessonCompletionButton(params: { lessonId: string, slug: string[] }) {
    const moduleInfo = await loadModuleInfo(params.slug.slice(0, -1).join("/"));
    const currentLessonIndex = moduleInfo.lessons.findIndex((lesson) => {
        return lesson.slug === params.slug.join("/");
    });
    const nextLesson = moduleInfo.lessons.at(currentLessonIndex + 1);

    let link = "/";
    if (nextLesson) {
        link = path.join("/lesson", nextLesson.slug);
    }

    return <ClientLessonCompletionButton lessonId={params.lessonId} href={link}/>;
}

export default LessonCompletionButton;
