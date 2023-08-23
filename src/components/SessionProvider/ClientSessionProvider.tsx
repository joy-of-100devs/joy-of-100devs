"use client";
import {SessionProvider} from "next-auth/react";
import React from "react";
import {Session} from "next-auth";

interface ProviderProps {
    children?: React.ReactNode,
    initialSession: Session | null,
}

export default function ClientSessionProvider(props: ProviderProps) {
    return <SessionProvider session={props.initialSession}>
        {props.children}
    </SessionProvider>
}

