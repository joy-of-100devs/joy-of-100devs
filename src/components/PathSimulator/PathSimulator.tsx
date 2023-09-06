import * as React from 'react';
import ServerImage from "@/components/ServerImage";
import ClientSidePathSimulator from "./ClientSidePathSimulator";
import ClientSidePathSimulatorProvider from "@/components/PathSimulator/ClientSidePathSimulatorProvider";

function PathSimulator() {
    return <div className={"flex bg-[#111] py-4 px-[16px] rounded-[8px]"}>
        <ClientSidePathSimulatorProvider>
            <div className={"relative"}>
                <ServerImage slug={"/02/04/file-routing.png"} alt={"File routing system"}></ServerImage>
                <ClientSidePathSimulator></ClientSidePathSimulator>
            </div>
        </ClientSidePathSimulatorProvider>
    </div>;
}

export default PathSimulator;
