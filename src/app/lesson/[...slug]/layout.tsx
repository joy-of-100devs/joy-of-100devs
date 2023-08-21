import React from "react";
import {loadLesson, loadModuleInfo} from "@/helpers/lessonHelper";
import IconButton, {IconLink} from "@/components/IconButton";
import {FaHome} from "react-icons/fa";
import Link from "next/link";
import {AiOutlineRight} from "react-icons/ai";
import LessonLink from "@/components/LessonLink";
import LessonNav, {LessonNavHamburger, LessonNavProvider} from "@/components/LessonNav";

export default async function LessonPageLayout(props: React.PropsWithChildren & {
    params: {slug: string[]}
}) {
    const moduleSlug = [...props.params.slug];
    moduleSlug.pop();
    const moduleInfo = await loadModuleInfo(moduleSlug.join("/"));
    const lessonInfo = await loadLesson(props.params.slug.join("/"));

    return <LessonNavProvider>
        <div className={"w-full h-full flex flex-col p-[16px] gap-[16px] overflow-hidden relative"}>
            <header className={"bg-background-1 flex flex-none gap-[12px] items-center p-[8px] mr-[4px] rounded-[8px]"}>
                <nav className={"flex"}>
                    <LessonNavHamburger></LessonNavHamburger>
                    <IconLink className={"hover:bg-background-2"} icon={FaHome} href={"/"}></IconLink>
                </nav>
                <div className={"flex items-center gap-[16px] overflow-auto"}>
                    <Link className={"w-max flex-none"} href={`/module/${moduleInfo.slug}`}>Module {moduleInfo.number} - {moduleInfo.data.title}</Link>
                    <AiOutlineRight className={"flex-none"}></AiOutlineRight>
                    <span className={"w-max flex-none"}>{lessonInfo.meta.title}</span>
                </div>
            </header>
            <div className={"flex-1 flex relative h-0 flex-1 gap-[16px] mr-[-8px]"}>
                <LessonNav>
                    {moduleInfo.lessons.map(lesson => {
                        return <LessonLink key={lesson.slug} slug={lesson.slug} isActive={props.params.slug.join("/") === lesson.slug} title={lesson.meta.title}></LessonLink>
                    })}
                </LessonNav>
                <main className={"flex-1 flex overflow-hidden justify-center"}>
                    <div className={"flex w-full flex-col overflow-y-scroll overflow-x-hidden gap-4 max-w-[1920px] pr-[8px] pb-8"}>
                        {props.children}
                    </div>
                </main>
            </div>
        </div>
    </LessonNavProvider>;
}
