import * as React from 'react';
import IconButton from "@/components/IconButton";
import {PiFlagPennantBold} from "react-icons/pi";
import styles from './styles.module.css'

async function LessonCompletionButton(params: { slug: string[] }) {
    return <IconButton icon={PiFlagPennantBold} className={styles.button}>Complete Lesson</IconButton>;
}

export default LessonCompletionButton;
