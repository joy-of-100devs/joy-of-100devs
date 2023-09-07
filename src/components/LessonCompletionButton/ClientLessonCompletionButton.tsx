"use client";

import * as React from 'react';
import {IconLink} from "@/components/IconButton";
import {PiFlagPennantBold} from "react-icons/pi";
import styles from './styles.module.css'
import {useSession} from "next-auth/react";
import axios from "axios";

async function LessonCompletionButton(params: { lessonId: string, href: string }) {
    const session = await useSession();

    async function completeLesson() {
        if (!session.data?.user) return;
        await axios.put(`/api/lessonCompletions`, {
            lessonId: params.lessonId,
        })
    }

    return <IconLink href={params.href}
                     icon={PiFlagPennantBold}
                     className={styles.button}
                     onClick={completeLesson}>Complete Lesson</IconLink>;
}

export default LessonCompletionButton;
