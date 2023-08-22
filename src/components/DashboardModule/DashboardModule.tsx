import * as React from 'react';
import {loadModuleInfo} from "@/helpers/lessonHelper";
import SpaceMap from "@/components/SpaceMap";

function DashboardModule(props: {moduleInfo: Awaited<ReturnType<typeof loadModuleInfo>>}) {
  return <div className={"flex flex-col gap-2"}>
    <div className={"justify-between bg-accent-6 rounded-[8px] p-[8px] px-[16px]"}>
      <h2 className={"my-2"}>{props.moduleInfo.data.title}</h2>
      <p className={"my-2"}>{props.moduleInfo.data.description}</p>
    </div>
    <SpaceMap lessons={props.moduleInfo.lessons}></SpaceMap>
  </div>;
}

export default DashboardModule;
