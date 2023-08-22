"use client";

import * as React from 'react';
import {LessonMetadata} from "@/helpers/lessonHelper";
import * as Popover from "@radix-ui/react-popover";
import {IconLink} from "@/components/IconButton";
import {FaPlay} from "react-icons/fa";
import path from "path";
import {AnimatePresence, motion} from "framer-motion";

export interface LessonTileProps {
    top: string;
    left: string;
    lesson: { slug: string, meta: LessonMetadata };
}

function LessonTile(props: LessonTileProps) {
    return <Popover.Root>
        <Popover.Trigger asChild={true}>
            <button style={{
                top: props.top,
                left: props.left,
            }}
                    className={"absolute w-12 aspect-square rounded-full bg-accent-4 -translate-x-1/2 -translate-y-1/2"}></button>
        </Popover.Trigger>
        <AnimatePresence>
            <Popover.Portal>
                <Popover.Content sideOffset={8}>
                    <motion.div
                        key={"popoverContent"}
                        layout={true}
                        transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 50,
                        }}
                        initial={{
                            scale: 0,
                            transformOrigin: "50% 0",
                        }} animate={{
                        transformOrigin: "50% 0",
                        scale: 1,
                    }} exit={{
                        scale: 0,
                    }}>
                        <Popover.Arrow className={"fill-accent-6"}></Popover.Arrow>
                        <div className={"p-[12px] px-[16px] bg-accent-6 flex flex-col gap-2 rounded-[16px]"}>
                            <h3 className={"m-0"}>{props.lesson.meta.title}</h3>
                            <IconLink icon={FaPlay} href={path.join("/lesson", props.lesson.slug)}
                                      className={"justify-center bg-background-2"}>Start Lesson</IconLink>
                        </div>
                    </motion.div>
                </Popover.Content>
            </Popover.Portal>
        </AnimatePresence>
    </Popover.Root>;
}

export default LessonTile;
