import React from "react";
import {
    CodePlaygroundConsoleContext,
    LogType
} from "@/components/CustomCodePlayground/CodePlaygroundConsoleProvider";
import styles from './CodePlaygroundConsole.module.css';

function CodePlaygroundConsole(props: {
    shown: boolean
}) {
    const {logs} = React.useContext(CodePlaygroundConsoleContext);
    console.log(logs);

    return <div className={`w-full ${props.shown ? "flex" : "hidden"} font-[Monospace] flex-col flex-1 overflow-y-scroll overflow-x-hidden`}>
        <ul className={"flex-1 w-full flex flex-col m-0 p-0"}>
            {logs.map((entry, index) => {
                return <LogEntry type={entry.type} key={index}>{entry.data}</LogEntry>;
            })}
        </ul>
    </div>;
}

function LogEntry(props: {
    children: string[],
    type: LogType,
}) {
    const mapping: Record<LogType, string> = {
        log: "",
        error: "bg-error",
        warn: "bg-warn",
        info: ""
    }

    return <li
        className={`flex flex-col gap-1 m-0 p-[8px] border-b-[1px] border-b-border-1 last-of-type:border-b-border-0 w-full ${mapping[props.type]}`}>
        {props.children.length > 0 ? props.children.map((item, index) => {
            return <pre key={index} className={`${styles.entry}`}>{item}</pre>
        }) : "ㅤ"}
    </li>;
}

export default React.memo(CodePlaygroundConsole);
