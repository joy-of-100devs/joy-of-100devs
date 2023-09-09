import React from "react";
import {useMergedUserFiles, useFiles} from "@/components/CustomCodePlayground/hooks/files";
import {SandpackFile, SandboxEnvironment} from "@codesandbox/sandpack-react/unstyled";
import {useMemoizedObject} from "@/hooks/useMemoized";

export interface CodePlaygroundContext {
    files: Record<string, SandpackFile>;
    environment?: SandboxEnvironment,
    externalResources?: string[],
    activeFile?: string,
    setActiveFile: (activeFile?: string) => void;
    resetFiles: () => void;
    editFile: (filepath: string, content: string) => void;
    createFile: (filepath: string, content: string) => void;
    deleteFile: (filepath: string) => void;
}

export const CodePlaygroundContext = React.createContext<CodePlaygroundContext>({
    files: {},
    activeFile: undefined,
    setActiveFile() {
    },
    deleteFile() {
    },
    editFile() {
    },
    createFile() {
    },
    resetFiles() {
    },
});

export interface CodePlaygroundProviderProps {
    files: Record<string, SandpackFile>,
    userFiles: Record<string, string | null>,
    environment?: SandboxEnvironment,
    externalResources?: string[],
    children?: React.ReactNode,
    initialActiveFile?: string,
}

// This version of Code Playground is *uncontrolled*.
function _CodePlaygroundProvider(props: CodePlaygroundProviderProps) {
    const initialMergedFiles = useMergedUserFiles(props.files, props.userFiles);
    const fileState = useFiles({
        originalFiles: props.files,
        mergedFiles: initialMergedFiles,
        initialActiveFile: props.initialActiveFile
    });

    return <CodePlaygroundContext.Provider value={useMemoizedObject({
        files: fileState.files,
        environment: props.environment,
        externalResources: props.externalResources,

        resetFiles: fileState.resetFiles,
        setActiveFile: fileState.setActiveFile,
        createFile: fileState.createFile,
        activeFile: fileState.activeFile,
        editFile: fileState.editFile,
        deleteFile: fileState.deleteFile,
    })}>
        {props.children}
    </CodePlaygroundContext.Provider>;
}

const CodePlaygroundProvider = React.memo(_CodePlaygroundProvider);
export default CodePlaygroundProvider;
