import React from "react";

export function useMemoizedObject<T extends object>(object: T) {
    return React.useMemo(() => {
        return object;
    }, Object.values(object));
}

export function useMemoizedArray<T extends any>(array: T[]) {
    return React.useMemo(() => {
        return array;
    }, array);
}
