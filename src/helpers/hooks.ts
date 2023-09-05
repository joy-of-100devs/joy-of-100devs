import React from "react";

export function useForwardedRef<T>(ref: React.ForwardedRef<T> | undefined, initial: T): React.MutableRefObject<T>
export function useForwardedRef<T>(ref: React.ForwardedRef<T | null> | undefined, initial: T | null): React.MutableRefObject<T | null>
export function useForwardedRef<T>(ref?: React.ForwardedRef<T | null>, initial: T | null = null) {
    const internalRef = React.useRef<T>(initial);
    if (typeof ref === "function") {
        ref(internalRef.current);
    } else if (ref) {
        ref.current = internalRef.current;
    }
    return internalRef;
}
