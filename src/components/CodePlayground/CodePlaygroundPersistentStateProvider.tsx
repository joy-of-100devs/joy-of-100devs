import {useSandpack} from "@codesandbox/sandpack-react/unstyled";
import React from "react";
import axios from "axios";
import {useMemoizedObject} from "@/hooks/useMemoized";
import useUpdateEffect from "@/helpers/effects";
import {SandpackBundlerFile} from "@codesandbox/sandpack-client";

export const CodePlaygroundPersistentStateContext = React.createContext<{
    resetCode: () => void
}>({
    resetCode() {}
});

export default function CodePlaygroundPersistentStateProvider(props: {
    repository: string,
    originalFiles: Record<string, SandpackBundlerFile>,
    initialActiveFile?: string,
    children?: React.ReactNode
}) {
    const [initialized, setInitialized] = React.useState(false);
    const sandpack = useSandpack();
    const activeFile = sandpack.sandpack.activeFile;
    const repository = props.repository;
    const state = useMemoizedObject(sandpack.sandpack);

    // Can't include the *state* or *sandpack* variable here to satisfy the lint gods. It deep-mutates all the time, unfortunately.
    React.useEffect(() => {
        const unsubscribe = sandpack.listen(e => {
            if (e.type === "start") {
                setInitialized(true);
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const resetCode = React.useCallback(() => {
        async function wipe() {
            await axios.delete("/api/snippets/wipe", {
                params: {
                    repository: repository,
                }
            });
        }

        for (let [filename] of Object.entries(sandpack.sandpack.files)) {
            sandpack.sandpack.deleteFile(filename, true);
        }
        for (let [filename, file] of Object.entries(props.originalFiles)) {
            sandpack.sandpack.updateFile(filename, file.code, true);
        }
        if (props.initialActiveFile) {
            sandpack.sandpack.openFile(props.initialActiveFile);
        }

        wipe().then();
    }, [repository, sandpack.sandpack, props.originalFiles, props.initialActiveFile]);

    // Modifying or creating code.
    useUpdateEffect(() => {
        if (!initialized) return;
        async function autoSave() {
            await axios.put("/api/snippets", {
                repository: repository,
                filename: activeFile,
                content: state.files[activeFile].code ?? null,
            });
        }

        const timeout = window.setTimeout(() => {
            autoSave().then();
        }, 1000);

        return () => {
            clearTimeout(timeout);
            autoSave().then();
        }
    }, [initialized, activeFile, state.files[activeFile], repository]);

    return <CodePlaygroundPersistentStateContext.Provider value={useMemoizedObject({resetCode})}>
        {props.children}
    </CodePlaygroundPersistentStateContext.Provider>;
}
