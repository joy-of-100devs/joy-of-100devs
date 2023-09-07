import * as React from 'react';
import Link from "next/link";
import path from "path";

function LessonLink(props: {
    slug: string,
    title: string,
    isActive: boolean,
    isCompleted: boolean,
}) {
    return <Link href={path.join("/lesson", props.slug)} className={"flex items-center px-[8px] gap-[12px] py-3"}>
        <span className={`${props.isActive ? "bg-accent-4" : props.isCompleted ? "bg-success" : 'bg-gray-500'} transition-colors w-2 h-2 aspect-square rounded-full`}/>
        <span className={`${props.isActive ? "font-[600]" : ''}`}>{props.title}</span>
    </Link>;
}

export default LessonLink;
