import React from "react";
import {CodePlaygroundConsoleContext} from "@/components/CustomCodePlayground/CodePlaygroundConsoleProvider";
import {LogType} from "@jest/console";

function CodePlaygroundConsole(props: {
    shown: boolean
}) {
    const {logs} = React.useContext(CodePlaygroundConsoleContext);

    return <div className={`w-full h-full ${props.shown ? "flex" : "hidden"} font-[Monospace] flex-col`}>
        <ul className={"flex-1 flex flex-col overflow-scroll m-0 p-0"}>
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
    return <li className={"flex flex-col gap-1 p-[8px] border-b-[1px] border-b-border-1 last-of-type:border-b-border-0"}>
        {props.children}
    </li>;
}

export default React.memo(CodePlaygroundConsole);
