"use client";

import * as React from 'react';
import {
    SandboxEnvironment,
    SandpackFile, SandpackPredefinedTemplate,
    SandpackProvider,
} from "@codesandbox/sandpack-react/unstyled";
import styles from './styles.module.css';
import CodePlaygroundLayout from "@/components/CodePlayground/CodePlaygroundLayout";
import {produce} from 'immer';
import CodePlaygroundPersistentStateProvider from "@/components/CodePlayground/CodePlaygroundPersistentStateProvider";

export interface CodePlaygroundProps {
    template?: SandpackPredefinedTemplate,
    environment?: SandboxEnvironment,
    files: Record<string, SandpackFile>,
    userFiles: Record<string, string|null>
    dependencies?: Record<string, string>,
    devDependencies?: Record<string, string>,
    repository: string,
    initialActiveFile?: string,
}

function ClientSideCodePlayground(props: CodePlaygroundProps) {
    const actualFiles = React.useMemo(() => {
        return produce(props.files, (draft) => {
            for (let [filename, content] of Object.entries(props.userFiles)) {
                if (content === null) {
                    delete draft[filename];
                } else {
                    draft[filename].code = content;
                }
            }
        })
    }, [props.files, props.userFiles])


    return <SandpackProvider
        template={props.template}
        files={actualFiles}
        customSetup={{
            dependencies: props.dependencies,
            devDependencies: props.devDependencies,
            environment: props.environment,
        }}
        className={styles.root}>
        <CodePlaygroundPersistentStateProvider initialActiveFile={props.initialActiveFile} repository={props.repository} originalFiles={props.files}>
            <CodePlaygroundLayout></CodePlaygroundLayout>
        </CodePlaygroundPersistentStateProvider>
    </SandpackProvider>;
}

export default ClientSideCodePlayground;
