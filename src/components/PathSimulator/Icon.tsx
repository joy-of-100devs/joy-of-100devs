import html from '@/assets/icons/html.svg';
import css from '@/assets/icons/css.svg';
import js from '@/assets/icons/js.svg';
import path from "path";
import React from "react";
import {useForwardedRef} from "@/helpers/hooks";

const ICONS: Record<string, React.FunctionComponent<React.ComponentProps<"svg" | "div">>> = {
    ".html": html, ".css": css, ".js": js
};

export interface IconData {
    constraintPoints: {
        top: HTMLDivElement|null,
        bottom: HTMLDivElement|null,
    };
}

export default function Icon(props: {
    path: string
}, ref: React.ForwardedRef<IconData>) {
    const parsed = path.parse(props.path);
    const extension = parsed.ext;
    const Icon = ICONS[extension] ?? "div";

    const internalRef = useForwardedRef(ref, {
        constraintPoints: {
            top: null,
            bottom: null,
        }
    });

    return <div className={"relative flex gap-[4px] py-2 px-[8px] flex-col items-center"}>
        <div className={"absolute top-0 outline-2 outline outline-red-300"} ref={e => {
            internalRef.current.constraintPoints.top = e;
        }}></div>
        <Icon className={"aspect-square w-16"}></Icon>
        <span>{parsed.base}</span>
        <div className={"absolute bottom-0 outline-2 outline outline-red-300"} ref={e => {
            internalRef.current.constraintPoints.bottom = e;
        }}></div>
    </div>;
}
