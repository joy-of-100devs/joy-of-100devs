import ColorEmphasis from "@/components/ColorEmphasis";
import CodePlaygroundFileExplorer from "./CodePlaygroundFileExplorer";
import CodePlaygroundUtilityButton from "./CodePlaygroundUtilityButton";
import {RxMagicWand, RxReload} from "react-icons/rx";
import {CodePlaygroundContext} from "./CodePlaygroundProvider";
import React from "react";
import CodePlaygroundEditor from "./CodePlaygroundEditor";
import styles from './CodePlaygroundLayout.module.css';
import CodePlaygroundPreview from "./CodePlaygroundPreview";
import {useCodeFormatter} from "./hooks/editor";

export default function CodePlaygroundLayout(props: {
    startRoute?: string;
}) {
    const {resetFiles, files, activeFile, editFile} = React.useContext(CodePlaygroundContext);
    const format = useCodeFormatter();

    return <div
        className={"flex flex-col text-sm bg-[#0003] rounded-[8px] mx-[-16px] xl:-mx-28 2xl:mx-[-15rem] overflow-hidden"}>
        <div className={"flex py-2 px-[12px] bg-background-1 items-center justify-between"}>
            <ColorEmphasis>Code Playground</ColorEmphasis>
            <div className={"flex-none flex gap-[8px] items-center"}>
                <CodePlaygroundUtilityButton icon={RxMagicWand} onClick={async () => {
                    if (activeFile) {
                        await editFile(activeFile, await format(files[activeFile].code));
                    }
                }}></CodePlaygroundUtilityButton>
                <CodePlaygroundUtilityButton icon={RxReload} onClick={() => {
                    resetFiles();
                }}></CodePlaygroundUtilityButton>
            </div>
        </div>
        <div className={`items-stretch grid w-full ${styles.layout}`}>
            <CodePlaygroundFileExplorer></CodePlaygroundFileExplorer>
            <CodePlaygroundEditor></CodePlaygroundEditor>
            <CodePlaygroundPreview></CodePlaygroundPreview>
        </div>
    </div>;
}

