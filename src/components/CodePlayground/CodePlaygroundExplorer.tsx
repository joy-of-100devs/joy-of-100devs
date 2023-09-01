import {SandpackFileExplorer} from "@codesandbox/sandpack-react/unstyled";
import styles from "@/components/CodePlayground/CodePlaygroundExplorer.module.css";
import * as React from "react";

export default function CodePlaygroundExplorer(props: {
    layoutVariant: "horizontal" | "vertical"
}) {
    return <SandpackFileExplorer
        className={`${styles.fileExplorer} ${props.layoutVariant === "vertical" ? styles.miniFileExplorer : ''}`}
        autoHiddenFiles={true}></SandpackFileExplorer>;
}
