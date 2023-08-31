import React from "react";

export default function useUpdateEffect(callback: React.EffectCallback, deps?: React.DependencyList) {
    const mountedRef = React.useRef<boolean>(false);
    React.useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            return;
        } else {
            callback();
        }
    }, deps);
}
