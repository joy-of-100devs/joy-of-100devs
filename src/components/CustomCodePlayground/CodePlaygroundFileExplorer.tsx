import React from "react";
import DirectoryContents from "@/components/CustomCodePlayground/DirectoryContents";

export default function CodePlaygroundFileExplorer() {
    return <div className={"w-full flex flex-col py-[8px] items-stretch bg-[#0002]"}>
        <DirectoryContents prefixedPath={"/"} level={0}/>
    </div>
}
