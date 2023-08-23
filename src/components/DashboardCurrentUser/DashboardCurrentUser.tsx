"use client";

import * as React from 'react';
import {useSession} from "next-auth/react";
import UserAvatar from "@/components/UserAvatar";

function DashboardCurrentUser() {
    const session = useSession();
    if (session.data) {
        const user = session.data.user;
        return <button className={"flex justify-center items-center gap-[12px] rounded-[8px] mx-[-4px] p-[12px] focus:bg-background-2 hover:bg-background-2 overflow-x-hidden"}>
            <UserAvatar userName={user.name} image={user.image}/>
            <div className={"hidden md:flex flex-col w-0 flex-1 justify-center gap-1 overflow-ellipsis text-left"}>
                <div className={"w-full max-w-full overflow-hidden overflow-ellipsis font-[600]"}>{user.name}</div>
                <div className={"w-full max-w-full overflow-hidden overflow-ellipsis"}>{user.email}</div>
            </div>
        </button>;
    } else {
        return null;
    }
}

export default DashboardCurrentUser;
