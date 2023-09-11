import * as React from "react";
import {capitalize} from "lodash";
import {z} from "zod";
import CodePlaygroundIFrame from "@/components/CustomCodePlayground/CodePlaygroundIFrame";
import CodePlaygroundConsole from "@/components/CustomCodePlayground/CodePlaygroundConsole";
import {CodePlaygroundConsoleContext} from "@/components/CustomCodePlayground/CodePlaygroundConsoleProvider";
import IconButton from "@/components/IconButton";
import {BsEraser} from "react-icons/bs";
import styles from './CodePlaygroundPreview.module.css'

export default function CodePlaygroundPreview() {
    const [previewMode, setPreviewMode] = React.useState<PreviewMode>("browser");

    return <div className={`flex flex-col ${styles.preview} overflow-hidden`}>
        <PreviewModeSwitcher mode={previewMode} switchMode={setPreviewMode}></PreviewModeSwitcher>
        <CodePlaygroundIFrame shown={previewMode === "browser"}></CodePlaygroundIFrame>
        <CodePlaygroundConsole shown={previewMode === "console"}></CodePlaygroundConsole>
    </div>;
}

const PREVIEW_MODES = z.enum(["browser", "console"]);
type PreviewMode = z.infer<typeof PREVIEW_MODES>;

interface PreviewModeSwitcherProps {
    mode: PreviewMode,
    switchMode: (newMode: PreviewMode) => void,
}

function PreviewModeSwitcher(props: PreviewModeSwitcherProps) {
    const {clearLogs} = React.useContext(CodePlaygroundConsoleContext);

    return <nav className={"flex justify-between gap-[4px] py-1 px-[8px] bg-[#0003]"}>
        <div className={"flex items-center"}>
            {PREVIEW_MODES._def.values.map(mode => {
                return <button
                    className={`${mode === props.mode ? "text-accent-4" : "text-primary"} p-[4px] `}
                    onClick={() => {
                        props.switchMode(mode);
                    }} key={mode}>{capitalize(mode)}</button>;
            })}
        </div>
        <IconButton icon={BsEraser} title={"Clear console"} onClick={clearLogs}
                    className={styles.clearConsoleButton}
                    iconClassName={styles.clearConsoleButtonIcon}></IconButton>

    </nav>;
}
