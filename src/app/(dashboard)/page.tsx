
import SpaceMap from "@/components/SpaceMap";
import {scanModules} from "@/helpers/lessonHelper";
import DashboardModule from "@/components/DashboardModule";

export default async function Dashboard() {
    const data = await scanModules();
    return <div className={"flex-col gap-12 overflow-y-scroll overflow-x-hidden flex-1 my-[-8px] pt-[8px] pr-[12px]"}>
        {data.map(item => {
            return <DashboardModule key={item.slug} moduleInfo={item}></DashboardModule>
        })}
    </div>
}
