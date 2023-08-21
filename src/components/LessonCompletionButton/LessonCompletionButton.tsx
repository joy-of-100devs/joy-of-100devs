import * as React from 'react';
import {IconLink} from "@/components/IconButton";
import {PiFlagPennantBold} from "react-icons/pi";
import styles from './styles.module.css'
import {loadModuleInfo} from "@/helpers/lessonHelper";
import path from "path";

async function LessonCompletionButton(params: { slug: string[] }) {
    const moduleInfo = await loadModuleInfo(params.slug.slice(0, -1).join("/"));
    const currentLessonIndex = moduleInfo.lessons.findIndex((lesson) => {
        return lesson.slug === params.slug.join("/");
    });
    const nextLesson = moduleInfo.lessons.at(currentLessonIndex + 1);

    let link = "/";
    if (nextLesson) {
        link = path.join("/lesson", nextLesson.slug);
    }

    return <IconLink href={link} icon={PiFlagPennantBold} className={styles.button}>Complete Lesson</IconLink>;
}

export default LessonCompletionButton;
