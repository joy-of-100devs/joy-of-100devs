"use client";

import * as React from 'react';
import {
    SandboxEnvironment,
    SandpackFile, SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react/unstyled";
import CodePlaygroundProvider from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import CodePlaygroundLayout from "@/components/CustomCodePlayground/CodePlaygroundLayout";
import {Sandpack} from "@codesandbox/sandpack-react";
import CodePlaygroundConsoleProvider from "@/components/CustomCodePlayground/CodePlaygroundConsoleProvider";

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
    return <>
        <CodePlaygroundProvider
            files={props.files}
            userFiles={props.userFiles}
            environment={props.environment}
            repository={props.repository}
            externalResources={props.externalResources}
            initialActiveFile={props.initialActiveFile}
            startRoute={props.startRoute}
        >
            <CodePlaygroundConsoleProvider>
                <CodePlaygroundLayout></CodePlaygroundLayout>
            </CodePlaygroundConsoleProvider>
        </CodePlaygroundProvider>
    </>;
}

export default ClientSideCodePlayground;
