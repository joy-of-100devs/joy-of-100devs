"use client";

import React from "react";
import {useMemoizedObject} from "@/hooks/useMemoized";

export interface ClientSidePathSimulatorContext {
    currentPath: string;
    setCurrentPath: (path: string) => void;
}

export const ClientSidePathSimulatorContext = React.createContext<ClientSidePathSimulatorContext>({
    currentPath: "",
    setCurrentPath: () => {
    },
});

export default function ClientSidePathSimulatorProvider(props: { children?: React.ReactNode }) {
    const [currentPath, setCurrentPath] = React.useState("");
    const memoized = useMemoizedObject({
        currentPath,
        setCurrentPath
    });
    return <ClientSidePathSimulatorContext.Provider value={memoized}>
        {props.children}
    </ClientSidePathSimulatorContext.Provider>;
}
