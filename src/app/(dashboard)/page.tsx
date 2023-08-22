import React from 'react';
import {scanModules} from "@/helpers/lessonHelper";
import DashboardModule from "@/components/DashboardModule";
import styles from './styles.module.css';

export default async function Dashboard() {
    const data = await scanModules();
    return <div className={`flex justify-center overflow-y-scroll overflow-x-hidden flex-1 my-[-8px] pt-[8px] pr-[12px]`}>
        <div className={`max-w-[12  0rem] flex-col flex gap-12`}>
            {data.map(item => {
                return <DashboardModule key={item.slug} moduleInfo={item}></DashboardModule>;
            })}
        </div>
    </div>;
}
