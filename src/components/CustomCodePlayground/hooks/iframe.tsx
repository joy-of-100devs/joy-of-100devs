import React from "react";
import {useEffectOnce} from "@/hooks/effects";
import {loadSandpackClient, SandpackClient} from "@codesandbox/sandpack-client";
import {SandboxEnvironment, SandpackFile} from "@codesandbox/sandpack-react/unstyled";
import {getClientBaseUrl} from "@/components/CustomCodePlayground/helpers/navigator";
import {useMemoizedObject} from "@/hooks/useMemoized";
import {dispatchCommand} from "@/components/CustomCodePlayground/helpers/iframe";

const RUNTIME_DISPATCHER_URL = new URL("/static/dispatcher.js", process.env.NEXT_PUBLIC_REPOSITORY_SERVER_URL);
const DEFAULT_START_ROUTE = "/";

interface ClientSetup {
    externalResources?: string[];
    startRoute?: string;
    files: Record<string, SandpackFile>;
    environment?: SandboxEnvironment;
}

interface ClientUpdateState {
    files: Record<string, SandpackFile>;
}

interface ClientNavigationInitialConfig {
    startRoute?: string;
}


export function useClient(iframeRef: React.RefObject<HTMLIFrameElement | null>, setup: ClientSetup): SandpackClient | null {
    const [client, setClient] = React.useState<SandpackClient | null>(null);

    useEffectOnce(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const runtimeDispatcherAbsoluteUrl = new URL(RUNTIME_DISPATCHER_URL, window.location.href).toString();

        const externalResources: string[] = [
            ...setup.externalResources ?? [],
            runtimeDispatcherAbsoluteUrl,
        ];

        let pendingClient = loadSandpackClient(iframe, {
            files: setup.files,
            template: setup.environment,
        }, {
            showOpenInCodeSandbox: false,
            externalResources: externalResources,
            startRoute: setup.startRoute ?? DEFAULT_START_ROUTE,
        });

        pendingClient.then(client => {
            const unsub = client.listen(e => {
                if (e.type === "done") {
                    setClient(client);
                }
                unsub();
            });
        });

        return () => {
            pendingClient.then(client => client.destroy());
        };
    });

    return client;
}

export function useClientUpdate(client: SandpackClient | null, state: ClientUpdateState) {
    React.useEffect(() => {
        const timeout = window.setTimeout(save, 500);

        async function save() {
            if (!client || !client.iframe) return;
            let url = await dispatchCommand<string>(client.iframe, "getUrl");
            client.updateSandbox({
                files: state.files,
            });
            requestAnimationFrame(() => {
                if (url) {
                    client.iframe.setAttribute("src", url);
                }
            });
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [client, state.files]);
}

export function useClientNavigation(client: SandpackClient | null, config: ClientNavigationInitialConfig) {
    const [navigatorUrl, setNavigatorUrl] = React.useState(config.startRoute ?? DEFAULT_START_ROUTE);
    const [needsToNavigate, setNeedsToNavigate] = React.useState(false);

    // Does first redirect once client initializes.
    React.useEffect(() => {
        async function firstRedirect() {
            if (!client) return;
            const baseUrl = await getClientBaseUrl(client);
            if (baseUrl) {
                setNeedsToNavigate(true);
                setNavigatorUrl(new URL(navigatorUrl, baseUrl).toString());
            }
        }

        firstRedirect().then();
    }, [client]);

    // Navigation is required.
    React.useEffect(() => {
        async function navigate() {
            if (needsToNavigate && client?.iframe && navigatorUrl) {
                setNeedsToNavigate(false);
                client.iframe.src = navigatorUrl;
            }
        }

        navigate().then();
    }, [client?.iframe, needsToNavigate, navigatorUrl]);

    // Attempts to sync URL in iframe with URL in browser.
    React.useEffect(() => {
        async function load(e: MessageEvent) {
            if (!client) return;
            const baseUrl = await getClientBaseUrl(client);
            if (!baseUrl) return;
            if (e.data.$type !== "UrlUpdate" || e.origin !== baseUrl.origin) return;
            setNavigatorUrl(e.data.url);
        }

        window.addEventListener("message", load);
        return () => {
            window.removeEventListener("message", load);
        };
    }, [client]);

    const back = React.useCallback(() => {
        if (!client?.iframe) return;
        dispatchCommand(client.iframe, "back").then();
    }, [client?.iframe]);

    const forward = React.useCallback(() => {
        if (!client?.iframe) return;
        dispatchCommand(client.iframe, "forward").then();
    }, [client]);

    const refresh = React.useCallback(() => {
        client?.dispatch({
            type: "refresh",
        });
    }, [client]);

    const setUrl = React.useCallback(async (newUrl: string) => {
        if (!client) return;
        const baseUrl = await getClientBaseUrl(client);
        if (!baseUrl) return;
        const newUrlWithBase = new URL(newUrl, baseUrl);
        if (newUrlWithBase.origin !== new URL(baseUrl).origin) {
            throw new Error("You cannot navigate to another website.");
        }
        setNavigatorUrl(newUrlWithBase.toString());
        setNeedsToNavigate(true);
    }, [client]);

    const goToStartRoute = React.useCallback(async () => {
        const startRoute = config.startRoute ?? DEFAULT_START_ROUTE;

        if (!client) return false;
        const baseUrl = await getClientBaseUrl(client);
        if (!baseUrl) return false;

        const newUrlWithBase = new URL(startRoute, baseUrl);
        setNavigatorUrl(newUrlWithBase.toString());
        setNeedsToNavigate(true);
        return true;
    }, [client, config.startRoute]);

    return useMemoizedObject({
        back, forward, refresh, url: navigatorUrl, setUrl, goToStartRoute,
    });
}
