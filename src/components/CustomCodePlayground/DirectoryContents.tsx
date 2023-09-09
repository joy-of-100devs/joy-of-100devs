import React from "react";
import {CodePlaygroundContext} from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import {fromPropsToModules} from "@/components/CustomCodePlayground/helpers/files";
import CodePlaygroundFile from "@/components/CustomCodePlayground/CodePlaygroundFile";
import CodePlaygroundDirectory from "@/components/CustomCodePlayground/CodePlaygroundDirectory";

function _DirectoryContents(props: {
    prefixedPath: string;
    level: number;
}) {
    const {files} = React.useContext(CodePlaygroundContext);
    const {modules, directories} = fromPropsToModules({
        files,
        visibleFiles: [],
        prefixedPath: props.prefixedPath,
        autoHiddenFiles: true,
    });

    return <ul className={"flex-col pl-0 list-none m-0"}>
        {modules.map(module => {
            return <CodePlaygroundFile path={module} key={module} level={props.level}></CodePlaygroundFile>
        })}
        {directories.map(module => {
            return <CodePlaygroundDirectory path={module} key={module} level={props.level}></CodePlaygroundDirectory>
        })}
    </ul>
}

export default React.memo(_DirectoryContents);
