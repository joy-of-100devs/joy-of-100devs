import path from "path";
import {useSandpack} from "@codesandbox/sandpack-react/unstyled";
import js from 'prettier/plugins/typescript';
import babel from 'prettier/plugins/babel';
import html from 'prettier/plugins/html';
import css from 'prettier/plugins/postcss';
import estree from 'prettier/plugins/estree';
import React from "react";
import prettier from "prettier/standalone";
import {CodePlaygroundContext} from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import parser from "postcss-selector-parser";

const LANG_MAPPING: Record<string, string> = {
    ".js": "javascript",
    ".jsx": "javascript",
    ".ts": "typescript",
    ".tsx": "typescript",
    ".html": "html",
    ".css": "css",
    ".json": "json",
};

const PRETTIER_PARSER_MAPPING: Record<string, string> = {
    ".js": "babel",
    ".jsx": "babel",
    ".ts": "babel-ts",
    ".tsx": "babel-ts",
    ".html": "html",
    ".css": "css",
    ".json": "json",
};

const PRETTIER_PLUGINS = [html, css, js, babel, estree];

export function useCodeLanguage() {
    const {activeFile} = React.useContext(CodePlaygroundContext);
    if (!activeFile) return;
    const fileExtension = path.parse(activeFile).ext;
    return LANG_MAPPING[fileExtension];
}

export function useCodeFormatter() {
    const {activeFile} = React.useContext(CodePlaygroundContext);
    let parser: string | undefined;
    if (activeFile) {
        let fileExtension = path.parse(activeFile).ext;
        parser = PRETTIER_PARSER_MAPPING[fileExtension];
    }
    return React.useCallback(async (code: string) => {
        if (!parser) return code;
        return prettier.format(code, {
            parser: parser,
            plugins: PRETTIER_PLUGINS,
        });
    }, [parser]);
}

