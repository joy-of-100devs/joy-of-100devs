// iFrame that is contained in an element.
import React from "react";
import {produce} from "immer";
import {SandpackFile} from "@codesandbox/sandpack-react/unstyled";
import {useMemoizedObject} from "@/hooks/useMemoized";

export function useInjectedIframe() {
    return React.useMemo(() => {
        const iframe = document.createElement("iframe");
        iframe.className = "";
        return iframe;
    }, []);
}

export function useInjectedIframeInsertion(ref: React.RefObject<HTMLDivElement | null>, iframe?: HTMLIFrameElement) {
    React.useEffect(() => {
        const container = ref.current;
        if (!container || !iframe) return;
        container.append(iframe);

        return () => {
            iframe.remove();
        };
    }, [ref, iframe]);
}
