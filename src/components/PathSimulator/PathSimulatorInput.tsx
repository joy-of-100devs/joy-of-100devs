"use client";

import React from "react";
import {ClientSidePathSimulatorContext} from "@/components/PathSimulator/ClientSidePathSimulatorProvider";

export default function PathSimulatorInput() {
    const id = React.useId();
    const {currentPath, setCurrentPath} =  React.useContext(ClientSidePathSimulatorContext);

    return <form className={"flex gap-2 items-center text-sm"}>
        <label htmlFor={id} className={"flex-none"}>Input path</label>
        <input type={"text"} className={"flex-1 bg-[#222] font-[Monospace] rounded-[8px] py-1 px-[6px]"} value={currentPath} onChange={e => {
            setCurrentPath(e.currentTarget.value);
        }}/>
    </form>
}
