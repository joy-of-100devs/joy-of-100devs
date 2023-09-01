import {SandpackFileExplorer, SandpackStack, useActiveCode, useSandpack} from "@codesandbox/sandpack-react/unstyled";
import {Editor, useMonaco} from "@monaco-editor/react";
import * as React from "react";
import styles from "@/components/CodePlayground/styles.module.css";
import {useCodeLanguage} from "@/helpers/codePlaygroundHelper";
import {SandpackCodeEditor} from "@codesandbox/sandpack-react/unstyled";


export default function CodePlaygroundEditor() {
    const {code, updateCode, readOnly} = useActiveCode();
    const {sandpack} = useSandpack();
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

    return (
        <SandpackStack className={styles.editor}>
            <SandpackFileExplorer className={`${styles.fileExplorer} ${styles.miniFileExplorer}`}
                                  autoHiddenFiles={true}></SandpackFileExplorer>
            <div className={styles.editorOuter}>
                <Editor
                    className={styles.editorInner}
                    width="100%"
                    height="100%"
                    language={codeLanguage}
                    key={sandpack.activeFile}
                    theme={init ? "dark" : "vs-dark"}
                    value={code}
                    options={{
                        readOnly: readOnly,
                        tabSize: 2,
                        scrollBeyondLastLine: false,
                        minimap: {
                            enabled: false,
                        },
                        wordWrap: "on",
                        renderLineHighlight: "none",
                    }}
                    onChange={(value) => {
                        updateCode(value || "");
                    }}
                />
            </div>
        </SandpackStack>

    );
}
