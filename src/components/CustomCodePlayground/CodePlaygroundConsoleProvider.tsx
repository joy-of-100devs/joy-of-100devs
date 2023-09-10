import React from "react";
import {produce} from "immer";
import {useMemoizedObject} from "@/hooks/useMemoized";
import {SandpackClient} from "@codesandbox/sandpack-client";
import {getClientBaseUrl} from "@/components/CustomCodePlayground/helpers/navigator";

type LogType = "log" | "error" | "warn" | "info";

export interface LogMessage {
    $type: "Console",
    type: LogType,
    data: string[]
}

interface Entry {
    type: LogType,
    data: string[]
}

interface CodePlaygroundConsoleContext {
    logs: Entry[],
    addLogs: (entry: Entry) => void,
    resetLogs: () => void,
}

export const CodePlaygroundConsoleContext = React.createContext<CodePlaygroundConsoleContext>({
    logs: [],
    addLogs() {
    },
    resetLogs() {
    },
});

function CodePlaygroundConsoleProvider(props: {
    children?: React.ReactNode
}) {
    const [logs, setLogs] = React.useState<Entry[]>([]);
    console.log(logs);
    const addLogs = React.useCallback(function (entry: Entry) {
        setLogs(logs => {
            return produce(logs, draft => {
                draft.push(entry);
            });
        });
    }, []);

    const resetLogs = React.useCallback(() => {
        setLogs([]);
    }, []);

    return <CodePlaygroundConsoleContext.Provider value={useMemoizedObject({
        logs, resetLogs, addLogs
    })}>
        {props.children}
    </CodePlaygroundConsoleContext.Provider>;
}

export function usePlaygroundConsoleProvider(client: SandpackClient | null) {
    const context = React.useContext(CodePlaygroundConsoleContext);

    React.useEffect(() => {
        async function load(e: MessageEvent<LogMessage>) {
            if (!client) return;
            const baseUrl = await getClientBaseUrl(client);
            if (!baseUrl) return;
            if (e.data.$type !== "Console" || e.origin !== baseUrl.origin) return;
            context.addLogs({
                type: e.data.type,
                data: e.data.data,
            });
        }

        window.addEventListener("message", load);
        return () => {
            window.removeEventListener("message", load);
        };
    }, [context, client]);
}

export default React.memo(CodePlaygroundConsoleProvider);
