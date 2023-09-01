"use client";

import * as React from 'react';
import IconButton from "@/components/IconButton";
import {FaEye} from "react-icons/fa";

interface ClientCodeSnippetProps {
    partial?: React.ReactNode,
    full: React.ReactNode,
}

function ClientCodeSnippet(props: ClientCodeSnippetProps) {
    // If partial is not found, the code is immediately expanded to full.
    const expandable = props.partial;
    const [expanded, setExpanded] = React.useState(!props.partial);

    return <div className={"relative block"}>
        {expanded ? props.full : props.partial}
        {expandable && <IconButton className={"absolute top-[8px] right-[8px] focus:bg-background-2 hover:bg-background-2"} onClick={() => {
            setExpanded(state => !state);
        }} icon={FaEye}>{expanded ? "Hide" : "Expand"}</IconButton>}
    </div>;
}

export default ClientCodeSnippet;
