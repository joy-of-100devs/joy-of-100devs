import React from "react";
import Logo from "@/components/Logo";
import {BiBook, BiStar} from "react-icons/bi";
import {PiTelevision} from "react-icons/pi";
import {BsCalendar4Event} from "react-icons/bs";
import {IconLink} from "@/components/IconButton";

const NAV_LINKS = [
    {
        icon: BiBook,
        label: "Lessons",
        href: "/",
    },
    {
        icon: BiStar,
        label: "Flashcards",
        href: "/flashcards",
    },
    {
        icon: PiTelevision,
        label: "Streams",
        href: "/streams",
    },
    {
        icon: BsCalendar4Event,
        label: "Events",
        href: "/events",
    },
]

export default function DashboardLayout(props: React.PropsWithChildren) {
    return <div className={"w-full h-full p-[8px] flex gap-[8px]"}>
        <nav className={"flex-none flex rounded-[8px] p-[8px]  px-[12px] overflow-auto flex-col bg-background-1"}>
            <Logo></Logo>
            <ul>
                {NAV_LINKS.map(link => {
                    return <IconLink className={"gap-[12px] hover:bg-background-2 justify-center md:justify-start"} iconClassName={"w-8 h-8"} href={link.href} icon={link.icon}>
                        <span className={"hidden md:block"}>{link.label}</span>
                    </IconLink>
                })}
            </ul>
        </nav>
    </div>
}
