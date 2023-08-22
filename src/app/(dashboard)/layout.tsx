import React from "react";
import DashboardNav from "@/components/DashboardNav";



export default function DashboardLayout(props: React.PropsWithChildren) {
    return <div className={"w-full h-full p-[8px] flex gap-[8px]"}>
        <DashboardNav></DashboardNav>
        <main className={"flex-1 flex"}>
            {props.children}
        </main>
    </div>
}
