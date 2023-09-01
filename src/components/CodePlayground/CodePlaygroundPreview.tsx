import styles from "@/components/CodePlayground/CodePlaygroundPreview.module.css";
import {SandpackConsole, SandpackPreview} from "@codesandbox/sandpack-react/unstyled";
import * as React from "react";
import {capitalize} from "lodash";
import {z} from "zod";

const PREVIEW_MODES = z.enum(["browser", "console"]);
type PreviewMode = z.infer<typeof PREVIEW_MODES>;

interface PreviewModeSwitcherProps {
    mode: PreviewMode, switchMode: (newMode: PreviewMode) => void,
}


export default function CodePlaygroundPreview() {
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("browser");

    return <div className={styles.preview}>
        <PreviewModeSwitcher mode={previewMode} switchMode={setPreviewMode}></PreviewModeSwitcher>
        <SandpackPreview
            showNavigator={true}
            showSandpackErrorOverlay={false}
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            className={previewMode === "browser" ? "flex" : "hidden"}
        ></SandpackPreview>
        <SandpackConsole
            className={`${previewMode === "console" ? "flex" : "hidden"} ${styles.console}`}
        ></SandpackConsole>
    </div>;
}

function PreviewModeSwitcher(props: PreviewModeSwitcherProps) {
    return <nav className={styles.previewNavigation}>
        {PREVIEW_MODES._def.values.map(mode => {
            return <button
                className={`${mode === props.mode ? "text-accent-4" : "text-primary"} p-[4px] `}
                onClick={() => {props.switchMode(mode)}} key={mode}>{capitalize(mode)}</button>
        })}
    </nav>
}
