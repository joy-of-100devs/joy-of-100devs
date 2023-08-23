import {z} from "zod";
import React from "react";

export const THEMES = z.enum(["light", "dark"]);
export type Theme = z.infer<typeof THEMES>;

export const THEME_COLORS: Record<Theme, React.CSSProperties> = {
    light: {
        '--color-primary': '#000',
        '--color-button': '#000',
        '--color-background-1': "#eee",
        '--color-background-2': "#DDD",
        '--color-accent-1': "#70c2d7",
        '--color-accent-2': "#FFF",
        '--color-accent-3': "#ffc867",
        '--color-accent-4': "#ffc376",
        '--color-accent-5': "#d79e3b",
        '--color-accent-6': "#b78d04",
        '--color-error': "#f65f5f",
        '--color-warning': "#e8c878",
        '--color-success': "#5cb463",
        '--color-info': "#5fc1f6",
    } as React.CSSProperties,
    dark: {
        '--color-primary': '#e4e6ef',
        '--color-button': '#232323',
        '--color-background-1': "#0d131a",
        '--color-background-2': "#222",
        '--color-accent-1': "#1d2844",
        '--color-accent-2': "#333f60",
        '--color-accent-3': "#ffef9d",
        '--color-accent-4': "#ffe367",
        '--color-accent-5': "#e8d510",
        '--color-accent-6': "#a46d24",
        '--color-error': "#c23434",
        '--color-warning': "#8f7110",
        '--color-success': "#23862b",
        '--color-info': "#2685b9",
    } as React.CSSProperties,
};
