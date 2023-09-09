"use client";

import * as React from 'react';
import {
    SandboxEnvironment,
    SandpackFile, SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react/unstyled";
import CodePlaygroundProvider from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import CodePlaygroundLayout from "@/components/CustomCodePlayground/CodePlaygroundLayout";

export interface CodePlaygroundProps {
    template?: SandpackPredefinedTemplate,
    environment?: SandboxEnvironment,
    files: Record<string, SandpackFile>,
    userFiles: Record<string, string | null>
    repository: string,
    initialActiveFile?: string,
    externalResources?: string[],
    startRoute?: string,
}

function ClientSideCodePlayground(props: CodePlaygroundProps) {
    return <CodePlaygroundProvider
        files={props.files}
        userFiles={props.userFiles}
        environment={props.environment}
        externalResources={props.externalResources}
        initialActiveFile={props.initialActiveFile}
    >
        <CodePlaygroundLayout></CodePlaygroundLayout>
    </CodePlaygroundProvider>;
}

export default ClientSideCodePlayground;
