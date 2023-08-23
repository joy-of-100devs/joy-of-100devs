import React from 'react';
import {scanModules} from "@/helpers/lessonHelper";
import DashboardModule from "@/components/DashboardModule";

export default async function Dashboard() {
    const data = await scanModules();
    return <div className={`flex justify-center overflow-y-scroll overflow-x-hidden flex-1 my-[-8px] py-[16px] pr-[12px]`}>
        <div className={`max-w-[120rem] flex-col flex gap-4`}>
            {data.map(item => {
                return <DashboardModule key={item.slug} moduleInfo={item}></DashboardModule>;
            })}
        </div>
    </div>;
}
