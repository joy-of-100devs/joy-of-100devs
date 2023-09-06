import * as React from 'react';
import ServerImage from "@/components/ServerImage";
import ClientSidePathSimulator from "./ClientSidePathSimulator";
import ClientSidePathSimulatorProvider from "@/components/PathSimulator/ClientSidePathSimulatorProvider";
import styles from './styles.module.css'
import PathSimulatorInput from "@/components/PathSimulator/PathSimulatorInput";

function PathSimulator() {
    return <div className={"flex flex-col gap-4 bg-[#111] py-4 px-[16px] rounded-[8px]"}>
        <ClientSidePathSimulatorProvider>
            <div className={styles.backdropRoot}>
                <ServerImage className={styles.image} slug={"/02/04/file-routing.png"} alt={"File routing system"}></ServerImage>
                <ClientSidePathSimulator></ClientSidePathSimulator>
            </div>
            <PathSimulatorInput></PathSimulatorInput>
        </ClientSidePathSimulatorProvider>
    </div>;
}

export default PathSimulator;
