import React from "react";
import {getFilename} from "@/components/CustomCodePlayground/helpers/files";
import {CodePlaygroundContext} from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import {RxFile} from "react-icons/rx";
import {file} from "@babel/types";
import {FaFolder, FaFolderOpen} from "react-icons/fa";
import {FaFolderClosed} from "react-icons/fa6";
import DirectoryContents from "@/components/CustomCodePlayground/DirectoryContents";
import {generatePaddingLeft} from "@/components/CustomCodePlayground/helpers/explorer";

function _CodePlaygroundDirectory(props: {
    path: string,
    level: number,
}) {
    const [expanded, setExpanded] = React.useState(false);
    const filename = getFilename(props.path);

    return <li className={"flex flex-col"}>
        <button className={`pr-[8px] py-1 flex items-center gap-[4px] hover:text-accent-4 focus-visible:text-accent-4`}
                style={{
                    paddingLeft: generatePaddingLeft(props.level),
                }} onClick={() => {
            setExpanded(!expanded);
        }}>
            {expanded ? <FaFolderOpen></FaFolderOpen> : <FaFolderClosed></FaFolderClosed>}
            <span>{filename}</span>
        </button>
        {expanded && <DirectoryContents prefixedPath={props.path} level={props.level + 1}></DirectoryContents>}
    </li>;
}

export default React.memo(_CodePlaygroundDirectory);
