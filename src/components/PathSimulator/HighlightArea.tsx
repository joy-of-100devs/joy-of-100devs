"use client";

// Offsets in percent so that the layers can shrink.
import React from "react";
import styles from './HighlightArea.module.css';
import {ClientSidePathSimulatorContext} from "@/components/PathSimulator/ClientSidePathSimulatorProvider";
import path from "path";

export interface HighlightAreaProps {
    // Coordinates
    width: number;
    height: number;
    top: number;
    left: number;

    // Path data
    path: string;
}

function parseRelativeURL(input: string) {
    const isRootURL = /^[\/\\]/.test(input);
    const slugs = input.split(/[\/\\]/).filter(x => x);
    if (isRootURL) {
        slugs.unshift("/");
    }
    return slugs;
}

function isMatchingRootPath(input: string, original: string, cwd: string = "") {
    try {
        const parsedInput = parseRelativeURL(input);
        const parsedOriginal = parseRelativeURL(original);
        return path.join(cwd, ...parsedInput) === path.join(...parsedOriginal);
    } catch (e) {
        return false;
    }
}

function isPartiallyMatchingRootPath(input: string, original: string, cwd: string = "") {
    try {
        const parsedInput = parseRelativeURL(input);
        const parsedOriginal = parseRelativeURL(original);
        for (let i = parsedInput.length; i > 0; i--) {
            const slice = parsedInput.slice(0, i);
            if (path.join(cwd, ...slice) === path.join(...parsedOriginal)) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

export default function HighlightArea(props: HighlightAreaProps) {
    const {currentPath} = React.useContext(ClientSidePathSimulatorContext);

    let highlight;
    if (isMatchingRootPath(currentPath, props.path)) {
        highlight = styles.target;
    } else if (isPartiallyMatchingRootPath(currentPath, props.path)) {
        highlight = styles.partial;
    } else {
        highlight = "";
    }

    return <button
        className={`rounded-[8px] border-none absolute 
        ${highlight} 
        ${styles.highlightArea}`}
        style={{
            "--width": `${props.width}%`,
            "--height": `${props.height}%`,
            "--top": `${props.top}%`,
            "--left": `${props.left}%`,
        } as React.CSSProperties}>
    </button>;
}
