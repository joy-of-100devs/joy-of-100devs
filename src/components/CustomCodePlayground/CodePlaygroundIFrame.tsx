import React from "react";
import {CodePlaygroundContext} from "@/components/CustomCodePlayground/CodePlaygroundProvider";
import CodePlaygroundNavigator from "@/components/CustomCodePlayground/CodePlaygroundNavigator";
import {shouldNavigatorExist} from "@/components/CustomCodePlayground/helpers/navigator";
import {useClient, useClientNavigation, useClientUpdate} from "@/components/CustomCodePlayground/hooks/iframe";
import {usePlaygroundConsoleProvider} from "@/components/CustomCodePlayground/CodePlaygroundConsoleProvider";


export interface NavigatorContext {
    back: () => void;
    forward: () => void;
    refresh: () => void;
    url: string;
    setUrl: (newUrl: string) => void;
    goToStartRoute: () => void;
}

export const NavigatorContext = React.createContext<NavigatorContext>({
    back() {
    },
    forward() {
    },
    refresh() {
    },
    url: "",
    setUrl: () => {
    },
    goToStartRoute() {
    },
});

function _CodePlaygroundIFrame() {
    const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
    const context = React.useContext(CodePlaygroundContext);

    const client = useClient(iframeRef, {
        files: context.files,
        environment: context.environment,
        startRoute: context.startRoute ?? "/",
        externalResources: context.externalResources,
    });

    useClientUpdate(client, {
        files: context.files,
    });

    usePlaygroundConsoleProvider(client);

    const navigatorFunctions = useClientNavigation(client, {
        startRoute: context.startRoute
    });

    return <NavigatorContext.Provider value={navigatorFunctions}>
        <div className={`w-full h-full flex flex-col`}>
            {client && shouldNavigatorExist(client) && <CodePlaygroundNavigator/>}
            <div className={"flex flex-1 relative"}>
                <iframe ref={iframeRef}
                        sandbox={"allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"}
                        className={"absolute rounded-[8px] top-0 left-0 w-full h-full bg-white"}></iframe>
            </div>
        </div>
    </NavigatorContext.Provider>;
}

export default React.memo(_CodePlaygroundIFrame);
