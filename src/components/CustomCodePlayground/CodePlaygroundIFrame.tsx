import React from "react";
import {loadSandpackClient, SandpackClient,} from "@codesandbox/sandpack-client";
import {delay} from "@/helpers/time";
import {CodePlaygroundContext} from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import {useEffectOnce} from "@/hooks/effects";

function _CodePlaygroundIFrame() {
    const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
    const context = React.useContext(CodePlaygroundContext);
    const [client, setClient] = React.useState<SandpackClient | null>(null);

    // Attempt to activate sandbox. Runs only once on mount.
    useEffectOnce(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        let pendingClient = loadSandpackClient(iframe, {
            files: context.files,
            template: context.environment,
        }, {
            showOpenInCodeSandbox: false,
        });

        pendingClient.then(client => setClient(client));

        return () => {
            pendingClient.then(client => client.destroy());
        };
    });

    React.useEffect(() => {
        client?.updateSandbox({
            files: context.files,
        });
    }, [client, context.files]);

    return <div className={`w-full h-full relative`}>
        <iframe ref={iframeRef} className={"absolute top-0 left-0 w-full h-full bg-white"}></iframe>
    </div>;
}

export default React.memo(_CodePlaygroundIFrame);
