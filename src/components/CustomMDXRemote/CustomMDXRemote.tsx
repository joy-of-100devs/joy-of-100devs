import * as React from 'react';
import {MDXRemote} from "next-mdx-remote/rsc";
import ColorEmphasis from "@/components/ColorEmphasis";
import {ComponentProps} from "react";
import AuthorNotes from "@/components/AuthorNotes";
import ServerImage from "../ServerImage";
import CodeSnippet from "@/components/CodeSnippet";
import CodePlayground from "@/components/CodePlayground";
import HTMLElementDemo from "@/components/HTMLElementDemo";
import HTMLElementDemo2 from "@/components/HTMLElementDemo2";
import HTMLElementDemo3 from "@/components/HTMLElementDemo3";

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
    h4: ({children, ...props}: ComponentProps<"h3">) => {
        return <h4 {...props}><ColorEmphasis>{children}</ColorEmphasis></h4>;
    },
    code: CodeSnippet,
    CodePlayground: CodePlayground,
    HTMLElementDemo: HTMLElementDemo,
    HTMLElementDemo2: HTMLElementDemo2,
    HTMLElementDemo3: HTMLElementDemo3,

};

function CustomMDXRemote({source}: { source: string }) {
    return <MDXRemote source={source} components={COMPONENT_MAP}/>;
}

export default CustomMDXRemote;
