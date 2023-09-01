"use client";

import * as React from "react";
import {
    SandpackConsole,
    SandpackLayout,
    SandpackPreview, useActiveCode
} from "@codesandbox/sandpack-react/unstyled";
import styles from "@/components/CodePlayground/styles.module.css";
import CodePlaygroundEditor from "@/components/CodePlayground/CodePlaygroundEditor";
import ColorEmphasis from "@/components/ColorEmphasis";
import {z} from "zod";
import {capitalize} from "lodash";
import PlaygroundUtilityButton, {CodeSandboxButton} from "@/components/CodePlayground/PlaygroundUtilityButton";
import {RxMagicWand, RxReload} from "react-icons/rx";
import {useCodeFormatter} from "@/helpers/codePlaygroundHelper";
import {CodePlaygroundPersistentStateContext} from "@/components/CodePlayground/CodePlaygroundPersistentStateProvider";
import CodePlaygroundExplorer from "@/components/CodePlayground/CodePlaygroundExplorer";
import CodePlaygroundPreview from "@/components/CodePlayground/CodePlaygroundPreview";



export default function CodePlaygroundLayout() {
    const {resetCode} = React.useContext(CodePlaygroundPersistentStateContext);
    const {code, updateCode} = useActiveCode();
    const formatCode = useCodeFormatter();

    return <SandpackLayout className={styles.layout}>
        <div className={styles.mainNavigation}>
            <ColorEmphasis>Code Playground</ColorEmphasis>
            <div className={"flex-none flex gap-[8px] items-center"}>
                <PlaygroundUtilityButton icon={RxMagicWand} onClick={async () => {
                    const newCode = await formatCode(code);
                    updateCode(newCode, true);
                }}></PlaygroundUtilityButton>
                <PlaygroundUtilityButton icon={RxReload} onClick={() => {
                    resetCode();
                }}></PlaygroundUtilityButton>
                <CodeSandboxButton></CodeSandboxButton>
            </div>
        </div>
        <div className={styles.innerLayout}>
            <CodePlaygroundExplorer layoutVariant={"horizontal"}></CodePlaygroundExplorer>
            <CodePlaygroundEditor></CodePlaygroundEditor>
            <CodePlaygroundPreview></CodePlaygroundPreview>
        </div>
    </SandpackLayout>;
}

