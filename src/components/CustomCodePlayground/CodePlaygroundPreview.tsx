import * as React from "react";
import {capitalize} from "lodash";
import {z} from "zod";
import CodePlaygroundIFrame from "@/components/CustomCodePlayground/CodePlaygroundIFrame";
import styles from './CodePlaygroundPreview.module.css'

export default function CodePlaygroundPreview(props: {
    startRoute?: string;
}) {
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("browser");

    return <div className={`flex flex-col ${styles.preview}`}>
        <PreviewModeSwitcher mode={previewMode} switchMode={setPreviewMode}></PreviewModeSwitcher>
        <CodePlaygroundIFrame></CodePlaygroundIFrame>
        {/*<SandpackPreview*/}
        {/*    showNavigator={true}*/}
        {/*    showSandpackErrorOverlay={false}*/}
        {/*    showOpenInCodeSandbox={false}*/}
        {/*    showRefreshButton={false}*/}
        {/*    className={previewMode === "browser" ? "flex" : "hidden"}*/}
        {/*    startRoute={props.startRoute}*/}
        {/*></SandpackPreview>*/}
        {/*<SandpackConsole*/}
        {/*    className={`${previewMode === "console" ? "flex" : "hidden"} ${styles.console}`}*/}
        {/*></SandpackConsole>*/}
    </div>;
}

const PREVIEW_MODES = z.enum(["browser", "console"]);
type PreviewMode = z.infer<typeof PREVIEW_MODES>;

interface PreviewModeSwitcherProps {
    mode: PreviewMode,
    switchMode: (newMode: PreviewMode) => void,
}

function PreviewModeSwitcher(props: PreviewModeSwitcherProps) {
    return <nav className={"flex gap-[4px] py-1 px-[8px] bg-[#0003] w-0"}>
        {PREVIEW_MODES._def.values.map(mode => {
            return <button
                className={`${mode === props.mode ? "text-accent-4" : "text-primary"} p-[4px] `}
                onClick={() => {
                    props.switchMode(mode);
                }} key={mode}>{capitalize(mode)}</button>;
        })}
    </nav>;
}
