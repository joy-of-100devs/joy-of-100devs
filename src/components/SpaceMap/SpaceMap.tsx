"use client";

import * as React from 'react';
import large from "./large.svg";
import {LessonMetadata} from "@/helpers/lessonHelper";
import _ from 'lodash';
import styles from './styles.module.css'
import {StaticImageData} from "next/image";
import axios from "axios";
import LessonTile from "@/components/LessonTile";
import {ReactSVG} from "react-svg";

async function loadSVG(data: StaticImageData): Promise<SVGSVGElement> {
    const raw = await axios.get(data.src).then(res => res.data);
    return new DOMParser().parseFromString(raw, "text/html").querySelector("svg")!;
}

const svgMap = {
    large: {data: large, element: loadSVG(large)},
}

function getPoints(svg: SVGSVGElement, lessonCount: number) {
    const path = svg.querySelector("path")!;
    const length = path.getTotalLength();
    const segLength = length / lessonCount;
    const points = _.range(0, lessonCount).map(idx => {
        return path.getPointAtLength(segLength * idx);
    });
    return points.map(point => {
        return {
            x: (point.x / svg.width.baseVal.value * 100).toFixed(2) + "%",
            y: (point.y / svg.height.baseVal.value * 100).toFixed(2) + "%",
        }
    });
}

function SpaceMap(props: { lessons: ({ slug: string, meta: LessonMetadata })[] }) {
    return <_SpaceMap {...props}></_SpaceMap>
}

function _SpaceMap(props: { lessons: ({ slug: string, meta: LessonMetadata })[] }) {
    const svg = React.use(svgMap.large.element);

    const points = React.useMemo(() => {
        return getPoints(svg, props.lessons.length);
    }, [svg, props.lessons]);

    return <div className={"text-primary flex-col flex flex-1 w-full p-6"}>
        <div className={"relative"}>
            <ReactSVG src={svgMap.large.data.src} className={`${styles.wrapperSVG}`}></ReactSVG>
            {points.map((point, index) => {
                const lesson = props.lessons[index];
                return <LessonTile top={point.y} left={point.x} key={lesson.slug} lesson={lesson}></LessonTile>
            })}
        </div>
    </div>;
}

export default SpaceMap;
