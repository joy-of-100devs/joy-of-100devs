import * as React from 'react';
import {ComponentProps} from "react";
import {themeConfigStore} from "@/helpers/persistentStores/server";
import ThemeConfigProvider from "../ThemeConfigProvider";

interface ThemeConfigServerProviderProps extends ComponentProps<"html"> {}

function ThemeConfigServerProvider(props: ThemeConfigServerProviderProps) {
    const initialTheme = themeConfigStore.load();

    return <ThemeConfigProvider initialTheme={initialTheme} {...props}/>
}

export default ThemeConfigServerProvider;
