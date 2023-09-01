import * as React from 'react';
import {Code} from "bright";
import {ComponentProps} from "react";
import ClientCodeSnippet from "@/components/ClientCodeSnippet";
import styles from './styles.module.css';

function CodeSnippet({...props}: ComponentProps<"code">) {
    const detectedLang = props.className?.split(/\s+/).map(term => term.match(/^language-(\w+)$/i)?.[1]).find(term => term !== null) ?? "js";

    if (typeof props.children !== "string") {
        throw new Error("The code component only supports strings!")
    }

    const actualProps = {
        ...props,
    }

    const partialString = props.children.split("\n").slice(0, 20).join("\n");
    const fullElement = <Code {...actualProps} lang={detectedLang} theme={"dracula"} className={`${styles.snippet} ${props.className || ""}`}></Code>

    if (partialString === props.children) {
        return <ClientCodeSnippet full={fullElement}/>
    } else {
        const partialElement = <Code {...actualProps} lang={detectedLang} theme={"dracula"} className={`${styles.snippet} ${props.className || ""}}`}>{partialString}</Code>
        return <ClientCodeSnippet partial={partialElement} full={fullElement}/>
    }
}

export default CodeSnippet;
