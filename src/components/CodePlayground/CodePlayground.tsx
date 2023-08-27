"use client";

import * as React from 'react';
import {
    SandpackProvider,
} from "@codesandbox/sandpack-react/unstyled";
import styles from './styles.module.css';
import CodePlaygroundLayout from "@/components/CodePlayground/CodePlaygroundLayout";

function CodePlayground() {
    return <SandpackProvider template={"react"} files={{
        "/App.js": `export default function Oof() {
    console.log(1);
    return <h1>Hello World!</h1>
}`
    }} className={styles.root}>
        <CodePlaygroundLayout></CodePlaygroundLayout>
    </SandpackProvider>;
}

export default CodePlayground;
