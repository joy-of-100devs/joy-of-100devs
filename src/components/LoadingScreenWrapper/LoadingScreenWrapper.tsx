"use client";

import * as React from 'react';
import {usePathname, useSearchParams} from "next/navigation";
import {useMemoizedObject} from "@/hooks/useMemoized";

interface LoadingScreenContext {
    loading: boolean,
    setLoading: (state: boolean) => void;
}
export const LoadingScreenContext = React.createContext<LoadingScreenContext>({
    loading: false,
    setLoading() {},
})

function LoadingScreenWrapper(props: {children?: React.ReactNode}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(false);
    }, [pathname, searchParams]);

    return <LoadingScreenContext.Provider value={useMemoizedObject({
        loading, setLoading
    })}>
        {/*This can be a place to insert a rocket overlay. 🚀 */}
        {loading && <div className={"fixed w-full h-full bg-[#00000066] z-20"}/>}
        {props.children}
    </LoadingScreenContext.Provider>;
}

export default React.memo(LoadingScreenWrapper);
