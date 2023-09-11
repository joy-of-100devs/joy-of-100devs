import {SandpackClient} from "@codesandbox/sandpack-client";
import {IPreviewRequestMessage, IPreviewResponseMessage} from "static-browser-server/src/preview/relay/types";
import {getExtension, normalizeFilepath} from "static-browser-server";
import {CHANNEL_NAME} from "static-browser-server/src/preview/relay/constants";
import {EXTENSIONS_MAP} from "@/components/CustomCodePlayground/helpers/extensions";

export const RUNTIME_DISPATCHER_URL = new URL("/static/dispatcher.js", process.env.NEXT_PUBLIC_REPOSITORY_SERVER_URL);
export const ERROR_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<script src="${RUNTIME_DISPATCHER_URL}"></script>
<meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" name="viewport">
<meta content="ie=edge" http-equiv="X-UA-Compatible">
<title>Document</title>
</head>
<body>
  <p>404 Not Found</p>
</body>
</html>`

// This patch allows 404 static pages to be able to navigate back to another page.
export function patchClient404(client: SandpackClient) {
    // @ts-ignore
    if (client.previewController) {
        // @ts-ignore
        client.previewController.handleWorkerRequest = async function(this, request: IPreviewRequestMessage) {
            if (!this.initPromise) {
                throw new Error("Init promise is null");
            }
            const [previewRoot, port] = await this.initPromise;
            try {
                const filepath = normalizeFilepath(
                    new URL(request.url, previewRoot).pathname
                );
                let body: string | Uint8Array | null = null;
                const headers: Record<string, string> = {};
                try {
                    body = await this.getFileContent(filepath);
                } catch (err) {
                    // do nothing
                }
                if (body == null) {
                    body = await this.getIndexAtPath(filepath);
                    headers["Content-Type"] = "text/html; charset=utf-8";
                }
                if (body == null) {
                    throw new Error("File not found");
                }
                if (!headers["Content-Type"]) {
                    const extension = getExtension(filepath);
                    const foundMimetype = EXTENSIONS_MAP.get(extension);
                    if (foundMimetype) {
                        headers["Content-Type"] = foundMimetype;
                    }
                }
                const responseMessage: IPreviewResponseMessage = {
                    $channel: CHANNEL_NAME,
                    $type: "preview/response",
                    id: request.id,
                    headers,
                    status: 200,
                    body,
                };
                port.postMessage(responseMessage);
            } catch (err) {
                const responseMessage: IPreviewResponseMessage = {
                    $channel: CHANNEL_NAME,
                    $type: "preview/response",
                    id: request.id,
                    headers: {
                        ["Content-Type"]: "text/html; charset=utf-8",
                    },
                    status: 404,
                    body: ERROR_PAGE,
                };
                port.postMessage(responseMessage);
            }
        };
        client.updateSandbox();
    }
}
