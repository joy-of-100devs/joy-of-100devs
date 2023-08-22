import * as React from 'react';
import {LessonMetadata} from "@/helpers/lessonHelper";
import styles from './styles.module.css';
import LargeMap from "./large.svg";
import _ from 'lodash';
import {renderAsHeadlessElement} from "@/helpers/headless";
import LessonTile from "@/components/LessonTile";

function getPoints(svg: SVGSVGElement, lessonCount: number) {
    const path = svg.querySelector("path")!;
    const length = path.getTotalLength();
    const segLength = length / lessonCount;
    const points = _.range(0, lessonCount).map(idx => {
        return path.getPointAtLength(segLength * idx);
    });
    const attrs = Array.from(svg.attributes);
    const width= +attrs.find(item => item.name === 'width')!.value;
    const height= +attrs.find(item => item.name === 'height')!.value;

    return points.map(point => {
        return {
            x: (point.x / width * 100).toFixed(2) + "%",
            y: (point.y / height * 100).toFixed(2) + "%",
        };
    });
}

async function SpaceMap(props: { lessons: ({ slug: string, meta: LessonMetadata })[] }) {
    const headless = await renderAsHeadlessElement<SVGSVGElement>(<LargeMap></LargeMap>);
    const points = getPoints(headless, props.lessons.length);

    return <div className={"text-primary flex-col flex flex-1 w-full p-6"}>
        <div className={"relative"}>
            <LargeMap className={styles.svg}></LargeMap>
            {points.map((point, index) => {
                const lesson = props.lessons[index];
                return <LessonTile top={point.y} left={point.x} key={lesson.slug} lesson={lesson}></LessonTile>;
            })}
        </div>
    </div>;
}

export default SpaceMap;
