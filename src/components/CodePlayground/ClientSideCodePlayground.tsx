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

export interface CodePlaygroundProps {
    template?: SandpackPredefinedTemplate,
    environment?: SandboxEnvironment,
    files: Record<string, SandpackFile>,
    dependencies?: Record<string, string>,
    devDependencies?: Record<string, string>,
}

function ClientSideCodePlayground(props: CodePlaygroundProps) {
    // Disable packers on both deps and devDeps to avoid timeout.
    const deps = produce(props.dependencies ?? {}, draft => {
        delete draft.vite;
    });
    const devDeps = produce(props.dependencies ?? {}, draft => {
        delete draft.vite;
    });
    return <SandpackProvider
        template={props.template}
        files={props.files}
        customSetup={{
            dependencies: deps,
            devDependencies: devDeps,
            environment: props.environment,
        }}
        className={styles.root}>
        <CodePlaygroundLayout></CodePlaygroundLayout>
    </SandpackProvider>;
}

export default ClientSideCodePlayground;
