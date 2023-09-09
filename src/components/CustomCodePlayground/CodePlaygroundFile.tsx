import React from "react";
import {getFilename} from "@/components/CustomCodePlayground/helpers/files";
import {CodePlaygroundContext} from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import {FaFile} from "react-icons/fa";
import {generatePaddingLeft} from "@/components/CustomCodePlayground/helpers/explorer";

function _CodePlaygroundFile(props: {
    path: string,
    level: number,
}) {
    const {setActiveFile, activeFile} = React.useContext(CodePlaygroundContext);
    const filename = getFilename(props.path);

    return <li>
        <button className={`pr-[8px] py-1 flex items-center gap-[4px] hover:text-accent-4 focus-visible:text-accent-4 ${activeFile === props.path ? "text-accent-4" : ''}`} style={{
            paddingLeft: generatePaddingLeft(props.level),
        }} onClick={() => {
            setActiveFile(props.path);
        }}>
            <FaFile></FaFile>
            <span>{filename}</span>
        </button>
    </li>;
}

export default React.memo(_CodePlaygroundFile);
