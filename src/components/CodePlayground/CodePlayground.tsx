"use client";

import * as React from 'react';
import {
    SandpackCodeEditor,
    SandpackFileExplorer,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider, SandpackThemeProvider
} from "@codesandbox/sandpack-react/unstyled";
import {dracula} from '@codesandbox/sandpack-themes';
import styles from './styles.module.css';

function CodePlayground() {
    return <SandpackProvider template={"react"} files={{
        "/App.js": "export default function Oof() {return <h1>Hello World!</h1>}"
    }} className={styles.root}>
        <SandpackThemeProvider theme={dracula}>
            <SandpackLayout className={styles.layout}>
                <SandpackFileExplorer className={styles.fileExplorer}></SandpackFileExplorer>
                <SandpackCodeEditor  className={styles.editor} showLineNumbers={true} wrapContent={true}></SandpackCodeEditor>
                <SandpackPreview className={styles.preview}></SandpackPreview>
            </SandpackLayout>
        </SandpackThemeProvider>
    </SandpackProvider>;
}

export default CodePlayground;
