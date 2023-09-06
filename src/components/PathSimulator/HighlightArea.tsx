// Offsets in percent so that the layers can shrink.
import React from "react";
import styles from './HighlightArea.module.css';

export interface HighlightAreaProps {
    // Coordinates
    width: number;
    height: number;
    top: number;
    left: number;

    // Path data
    path: string;
}

export default function HighlightArea(props: HighlightAreaProps) {
    return <button className={`rounded-[8px] border-none bg-[#fff2] absolute ${styles.highlight}`} style={{
        "--width": `${props.width}%`,
        "--height": `${props.height}%`,
        "--top": `${props.top}%`,
        "--left": `${props.left}%`,
    } as React.CSSProperties}>
    </button>;
}
