"use client";

import React from "react";
import {useMemoizedObject} from "@/hooks/useMemoized";

export interface ClientSidePathSimulatorContext {
    cwd?: string;
    currentPath: string;
    setCurrentPath: (path: string) => void;
}

export const ClientSidePathSimulatorContext = React.createContext<ClientSidePathSimulatorContext>({
    currentPath: "",
    setCurrentPath: () => {
    },
});

export default function ClientSidePathSimulatorProvider(props: { cwd?: string, children?: React.ReactNode }) {
    const [currentPath, setCurrentPath] = React.useState("");
    const memoized = useMemoizedObject({
        cwd: props.cwd,
        currentPath,
        setCurrentPath
    });
    return <ClientSidePathSimulatorContext.Provider value={memoized}>
        {props.children}
    </ClientSidePathSimulatorContext.Provider>;
}
