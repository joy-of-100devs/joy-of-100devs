import * as React from 'react';
import {MDXRemote} from "next-mdx-remote/rsc";
import ColorEmphasis from "@/components/ColorEmphasis";
import {ComponentProps} from "react";
import AuthorNotes from "@/components/AuthorNotes";
import ServerImage from "../ServerImage";

const COMPONENT_MAP = {
    ColorEmphasis: ColorEmphasis,
    AuthorNotes: AuthorNotes,
    ServerImage: ServerImage,
    h2: ({children, ...props}: ComponentProps<"h2">) => {
        return <h2 {...props}><ColorEmphasis>{children}</ColorEmphasis></h2>;
    },
    h3: ({children, ...props}: ComponentProps<"h3">) => {
        return <h3 {...props}><ColorEmphasis>{children}</ColorEmphasis></h3>;
    },
};

function CustomMDXRemote({source}: { source: string }) {
    return <MDXRemote source={source} components={COMPONENT_MAP}/>;
}

export default CustomMDXRemote;
