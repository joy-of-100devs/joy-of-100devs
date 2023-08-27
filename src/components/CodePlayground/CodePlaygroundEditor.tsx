import {SandpackFileExplorer, SandpackStack, useActiveCode, useSandpack} from "@codesandbox/sandpack-react/unstyled";
import {Editor, useMonaco} from "@monaco-editor/react";
import * as React from "react";
import styles from "@/components/CodePlayground/styles.module.css";
import path from "path";

const LANG_MAPPING: Record<string, string> = {
    ".js": "javascript",
    ".jsx": "javascript",
    ".html": "html",
    ".css": "css",
    ".json": "json",
}

export default function CodePlaygroundEditor() {
    const {code, updateCode} = useActiveCode();
    const {sandpack} = useSandpack();
    const monaco = useMonaco();
    const [init, setInit] = React.useState(false);

    const fileExtension = path.parse(sandpack.activeFile).ext;

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

    return (
        <SandpackStack className={styles.editor}>
            <SandpackFileExplorer className={`${styles.fileExplorer} ${styles.miniFileExplorer}`}></SandpackFileExplorer>
            <div className={styles.editorOuter}>
                <Editor
                    className={styles.editorInner}
                    width="100%"
                    height="100%"
                    language={LANG_MAPPING[fileExtension]}
                    theme={init ? "dark" : "vs-dark"}
                    key={sandpack.activeFile}
                    value={code}
                    options={{
                        tabSize: 2,
                        scrollBeyondLastLine: false,
                        minimap: {
                            enabled: false,
                        },
                        wordWrap: "on",
                        renderLineHighlight: "none",
                    }}
                    onChange={(value) => updateCode(value || "")}
                />
            </div>
        </SandpackStack>

    );
}
