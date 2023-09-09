import {SandpackFile} from "@codesandbox/sandpack-react/unstyled";
import {useMemoizedObject} from "@/hooks/useMemoized";
import React from "react";
import {produce} from "immer";
import {generateDirectoriesFromFiles} from "@/components/CustomCodePlayground/helpers/files";
import {file} from "@babel/types";
import path from "path";

const DUMMY_FILENAME = ".sandpack_directory_mark";

export function useMergedUserFiles(files: Record<string, SandpackFile>, userFiles: Record<string, string | null>) {
    return useMemoizedObject(React.useMemo(() => {
        return produce(files, (draft) => {
            for (let [filename, content] of Object.entries(userFiles)) {
                if (content === null) {
                    delete draft[filename];
                } else {
                    draft[filename] = {
                        ...draft[filename],
                        code: content,
                    };
                }
            }
        });
    }, [files, userFiles]));
}

export function useFilesWithEnsuredPlaceholder(files: Record<string, SandpackFile>) {
    return useMemoizedObject(React.useMemo(() => {
        const intermediateDirectories = generateDirectoriesFromFiles(Object.keys(files));

        return produce(files, (draft) => {
            for (let directory of intermediateDirectories) {
                draft[path.join(directory, DUMMY_FILENAME)] = {
                    code: "",
                    active: false,
                    hidden: true,
                    readOnly: true,
                };
            }
        });
    }, [files]));
}

interface EditFileAction {
    type: "edit",
    filepath: string,
    content: string,
}

interface CreateFileAction {
    type: "create",
    filepath: string,
    content: string,
}

interface DeleteFileAction {
    type: "delete",
    filepath: string,
}

interface ResetFileAction {
    type: "reset",
    files: Record<string, SandpackFile>,
}

interface CreateDirectoryAction {
    type: "createDirectory",
    path: string,
}

interface RenameDirectoryAction {
    type: "renameDirectory",
    path: string,
    newPath: string,
}

interface DeleteDirectoryAction {
    type: "deleteDirectory",
    path: string,
}


type FileAction =
    EditFileAction | DeleteFileAction | CreateFileAction | ResetFileAction |
    CreateDirectoryAction | RenameDirectoryAction | DeleteDirectoryAction;

function fileReducer(state: Record<string, SandpackFile>, action: FileAction) {
    return produce(state, draft => {
        // Works on either directory or file.
        function assertEntryNotExists(entryPath: string) {
            const dummyFile = path.join(entryPath, DUMMY_FILENAME);
            if (draft[dummyFile] || draft[entryPath]) {
                throw new Error("Entry already exists.");
            }
        }

        switch (action.type) {
            case "delete": {
                delete draft[action.filepath];
                break;
            }
            case "createDirectory": {
                assertEntryNotExists(action.path);
                const dummyFile = path.join(action.path, DUMMY_FILENAME);
                // Either a directory (case 1) or file already exists.
                draft[dummyFile] = {
                    code: "",
                    active: false,
                    hidden: true,
                    readOnly: true,
                };
                break;
            }
            case "renameDirectory": {
                assertEntryNotExists(action.path);
                const matches = Object.keys(state).filter(file => file.startsWith(action.path));
                for (let renamedFilePath of matches) {
                    const newFilePath = renamedFilePath.replace(action.path, action.newPath);
                    draft[newFilePath] = draft[renamedFilePath];
                    delete draft[renamedFilePath];
                }
                break;
            }
            case "deleteDirectory": {
                assertEntryNotExists(action.path);
                const matches = Object.keys(state).filter(file => file.startsWith(action.path));
                for (let deletedFilePath of matches) {
                    delete draft[deletedFilePath];
                }
                break;
            }
            case "edit": {
                draft[action.filepath].code = action.content;
                break;
            }
            case "create": {
                assertEntryNotExists(action.filepath);
                draft[action.filepath] = {
                    code: action.content,
                    active: false,
                    readOnly: false,
                    hidden: false,
                };
                break;
            }
            case "reset": {
                return action.files;
            }
        }
    });
}

export function useFiles(data: {
    originalFiles: Record<string, SandpackFile>,
    mergedFiles: Record<string, SandpackFile>,
    initialActiveFile?: string;
}) {
    const [files, manageFiles] = React.useReducer(fileReducer, data.mergedFiles);
    const [activeFile, setActiveFile] = React.useState<string|undefined>(data.initialActiveFile);

    const editFile = React.useCallback((filepath: string, content: string) => {
        manageFiles({
            type: "edit",
            content: content,
            filepath: filepath,
        });
    }, []);

    const createFile = React.useCallback((filepath: string, content: string) => {
        manageFiles({
            type: "create",
            content: content,
            filepath: filepath,
        });
        setActiveFile(filepath);
    }, []);

    const deleteFile = React.useCallback((filepath: string) => {
        manageFiles({
            type: "delete",
            filepath: filepath,
        });
        if (activeFile === filepath) {
            setActiveFile(undefined);
        }
    }, [activeFile]);

    const resetFiles = React.useCallback(() => {
        manageFiles({
            type: "reset",
            files: data.originalFiles,
        });
        setActiveFile(data.initialActiveFile);
    }, [data.originalFiles, data.initialActiveFile]);

    return useMemoizedObject({
        files: useFilesWithEnsuredPlaceholder(files),
        activeFile,
        setActiveFile,
        editFile,
        createFile,
        deleteFile,
        resetFiles,
    });
}
