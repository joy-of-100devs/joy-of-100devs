import {SandpackClient} from "@codesandbox/sandpack-client";

export function dispatchCommand<Result>(iframe: HTMLIFrameElement, command: string, args?: any, timeout: number = 5): Promise<Result> {
    const invocationId = crypto.randomUUID();

    if (!iframe.contentWindow) {
        throw new Error("Content window not found.");
    }

    iframe.contentWindow.postMessage({
        $type: "IframeCommand",
        type: command,
        invocationId: invocationId,
        arguments: args,
    }, "*");

    return new Promise<Result>((resolve, reject) => {
        function throwError() {
            reject(new Error("Iframe command timed out."));
            window.removeEventListener("message", handle);
        }

        const timeoutInstance = setTimeout(throwError, timeout * 1000);

        function handle(e: MessageEvent) {
            if (e.data.$type === "IframeCommandResponse" && e.data.invocationId === invocationId) {
                resolve(e.data.result);
                clearTimeout(timeoutInstance);
                window.removeEventListener("message", handle);
            }
        }

        window.addEventListener("message", handle);
    });
}


export function getClientType(client: SandpackClient) {
    // @ts-ignore accessing private members to infer type
    if (client.previewController) {
        return "static";
    }
    // @ts-ignore accessing private members to infer type
    else if (client.bundlerURL) {
        return "runtime";
    }
    else {
        return "node";
    }
}
