import React from "react";
import {useMergedUserFiles, useFiles} from "@/components/CustomCodePlayground/hooks/files";
import {SandpackFile, SandboxEnvironment} from "@codesandbox/sandpack-react/unstyled";
import {useMemoizedObject} from "@/hooks/useMemoized";
import axios from "axios";

export interface CodePlaygroundContext {
    files: Record<string, SandpackFile>;
    startRoute?: string;
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
    startRoute: undefined,
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
    repository: string,
    environment?: SandboxEnvironment,
    externalResources?: string[],
    children?: React.ReactNode,
    initialActiveFile?: string,
    startRoute?: string,
}

// This version of Code Playground is *uncontrolled*.
function _CodePlaygroundProvider(props: CodePlaygroundProviderProps) {
    const initialMergedFiles = useMergedUserFiles(props.files, props.userFiles);
    const fileState = useFiles({
        originalFiles: props.files,
        mergedFiles: initialMergedFiles,
        initialActiveFile: props.initialActiveFile
    });

    React.useEffect(() => {
        async function save() {
            if (fileState.activeFile) {
                await axios.put("/api/snippets", {
                    filename: fileState.activeFile,
                    content: fileState.files[fileState.activeFile]?.code ?? null,
                    repository: props.repository,
                });
            }
        }

        const timeout = window.setTimeout(save, 500);

        return () => {
            save().then();
            clearTimeout(timeout);
        };
    }, [fileState.files, props.repository, fileState.activeFile]);

    return <CodePlaygroundContext.Provider value={useMemoizedObject({
        files: fileState.files,
        environment: React.useRef(props.environment).current, // Fix the value as this context is the source of truth
        externalResources: React.useRef(props.externalResources).current,
        startRoute: React.useRef(props.startRoute).current,
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
