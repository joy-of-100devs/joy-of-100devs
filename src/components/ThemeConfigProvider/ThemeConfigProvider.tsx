"use client";

import * as React from 'react';
import {ComponentProps, memo} from 'react';
import {Theme, THEME_COLORS, THEMES} from "@/constants";
import {useMemoizedObject} from "@/hooks/useMemoized";
import {themeConfigStore} from "@/helpers/persistentStores/client";

interface ThemeConfigProviderProps extends ComponentProps<"html"> {
    initialTheme: Theme,
}

interface ThemeConfigContext {
    theme: Theme,
    toggleTheme: () => void,
    setTheme: (theme: Theme) => void,
}

export const ThemeConfigContext = React.createContext<ThemeConfigContext>({
    theme: "dark",
    setTheme: () => {
    },
    toggleTheme: () => {
    },
});

function ThemeConfigProvider({initialTheme, ...delegatedProps}: ThemeConfigProviderProps) {
    const [theme, setTheme] = React.useState(initialTheme);

    const toggleTheme = React.useCallback(() => {
        setTheme(theme => {
            const acceptedValues = THEMES._def.values;
            const idx = acceptedValues.indexOf(theme);
            return acceptedValues[(idx + 1) % acceptedValues.length];
        });
    }, []);

    React.useEffect(() => {
        themeConfigStore.save(theme);
    }, [theme]);

    const memoized: ThemeConfigContext = useMemoizedObject({
        theme: initialTheme,
        setTheme: setTheme,
        toggleTheme: toggleTheme,
    });

    const memoizedTheme = useMemoizedObject({
        ...delegatedProps.style,
        ...THEME_COLORS[theme]
    });

    return <ThemeConfigContext.Provider value={memoized}>
        <html {...delegatedProps} style={memoizedTheme}></html>
    </ThemeConfigContext.Provider>;
}

export default ThemeConfigProvider;
