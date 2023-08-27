import * as React from "react";
import {
    SandpackConsole,
    SandpackFileExplorer,
    SandpackLayout,
    SandpackPreview, useSandpack
} from "@codesandbox/sandpack-react/unstyled";
import styles from "@/components/CodePlayground/styles.module.css";
import CodePlaygroundEditor from "@/components/CodePlayground/CodePlaygroundEditor";
import ColorEmphasis from "@/components/ColorEmphasis";
import {z} from "zod";
import {capitalize} from "lodash";
import IconButton from "@/components/IconButton";
import {BiRefresh} from "react-icons/bi";

const PREVIEW_MODES = z.enum(["browser", "console"]);
type PreviewMode = z.infer<typeof PREVIEW_MODES>;

export default function CodePlaygroundLayout() {
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("browser");
    const sandpack = useSandpack();

    return <SandpackLayout className={styles.layout}>
        <div className={styles.mainNavigation}>
            <ColorEmphasis>Code Playground</ColorEmphasis>
        </div>
        <div className={styles.innerLayout}>
            <SandpackFileExplorer className={styles.fileExplorer}></SandpackFileExplorer>
            <CodePlaygroundEditor></CodePlaygroundEditor>
            <div className={styles.preview}>
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
            </div>
        </div>
    </SandpackLayout>;
}

interface PreviewModeSwitcherProps {
    mode: PreviewMode, switchMode: (newMode: PreviewMode) => void,
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
