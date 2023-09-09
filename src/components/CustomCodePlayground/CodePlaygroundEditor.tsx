import {Editor, useMonaco} from "@monaco-editor/react";
import * as React from "react";
import {useCodeLanguage} from "./hooks/editor";
import {CodePlaygroundContext} from "./CodePlaygroundProvider";

function _CodePlaygroundEditor() {
    const context = React.useContext(CodePlaygroundContext);
    const monaco = useMonaco();
    const [init, setInit] = React.useState(false);
    const codeLanguage = useCodeLanguage();

    React.useEffect(() => {
        if (!monaco) return;
        monaco.editor.defineTheme("dark", {
            base: "vs-dark",
            colors: {
                "editor.background": "#00000000",
            },
            inherit: true,
            rules: [],
        });
        setInit(true);
    }, [monaco]);

    const activeFile = context.activeFile;
    const currentFileData = activeFile ? context.files[activeFile] : void 0;

    let editor;

    if (activeFile && currentFileData) {
        editor = <Editor
            width="100%"
            height="100%"
            language={codeLanguage}
            key={context.activeFile}
            theme={init ? "dark" : "vs-dark"}
            value={currentFileData.code}
            options={{
                readOnly: currentFileData.readOnly,
                tabSize: 2,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false,
                },
                wordWrap: "on",
                renderLineHighlight: "none",
            }}
            className={"absolute w-full h-full"}
            onChange={(value) => {
                context.editFile(activeFile, value || "");
            }}
        />;
    }

    return (
        <div className={"flex flex-col w-full"}>
            {currentFileData && editor}
        </div>
    );
}

export default React.memo(_CodePlaygroundEditor);
