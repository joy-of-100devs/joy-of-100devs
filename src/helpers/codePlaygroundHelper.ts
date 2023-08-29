import path from "path";
import {useSandpack} from "@codesandbox/sandpack-react/unstyled";
import js from 'prettier/plugins/typescript';
import babel from 'prettier/plugins/babel';
import html from 'prettier/plugins/html';
import css from 'prettier/plugins/postcss';
import estree from 'prettier/plugins/estree';
import React from "react";
import prettier from "prettier/standalone";

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
    const {sandpack} = useSandpack();
    const fileExtension = path.parse(sandpack.activeFile).ext;
    return LANG_MAPPING[fileExtension];
}

export function useCodeFormatter() {
    const {sandpack} = useSandpack();
    const fileExtension = path.parse(sandpack.activeFile).ext;
    const parser = PRETTIER_PARSER_MAPPING[fileExtension];

    return React.useCallback(async (code: string) => {
        return prettier.format(code, {
            parser: parser,
            plugins: PRETTIER_PLUGINS,
        });
    }, [parser]);
}
