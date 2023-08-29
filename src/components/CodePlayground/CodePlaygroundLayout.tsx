import * as React from "react";
import {
    SandpackConsole,
    SandpackFileExplorer,
    SandpackLayout,
    SandpackPreview, useActiveCode, useSandpack
} from "@codesandbox/sandpack-react/unstyled";
import styles from "@/components/CodePlayground/styles.module.css";
import CodePlaygroundEditor from "@/components/CodePlayground/CodePlaygroundEditor";
import ColorEmphasis from "@/components/ColorEmphasis";
import {z} from "zod";
import {capitalize} from "lodash";
import PlaygroundUtilityButton, {CodeSandboxButton} from "@/components/CodePlayground/PlaygroundUtilityButton";
import {RxMagicWand, RxOpenInNewWindow, RxReload} from "react-icons/rx";
import prettier from "prettier/standalone";
import {useCodeFormatter} from "@/helpers/codePlaygroundHelper";

const PREVIEW_MODES = z.enum(["browser", "console"]);
type PreviewMode = z.infer<typeof PREVIEW_MODES>;

export default function CodePlaygroundLayout() {
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("browser");
    const {code, updateCode} = useActiveCode();
    const sandpack = useSandpack();
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
                    sandpack.sandpack.resetAllFiles();
                }}></PlaygroundUtilityButton>
                <CodeSandboxButton></CodeSandboxButton>
            </div>
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
