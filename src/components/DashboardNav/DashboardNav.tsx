import * as React from 'react';
import Logo from "@/components/Logo";
import {IconLink} from "@/components/IconButton";
import {BiBook, BiStar} from "react-icons/bi";
import {PiTelevision} from "react-icons/pi";
import {BsCalendar4Event} from "react-icons/bs";
import DashboardCurrentUser from "@/components/DashboardCurrentUser";

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
function DashboardNav() {
  return <nav className={"flex-none md:w-[15rem] flex rounded-[8px] p-[8px]  px-[12px] overflow-y-auto overflow-x-hidden flex-col bg-background-1"}>
    <Logo></Logo>
    <ul className={"list-none pl-0"}>
      {NAV_LINKS.map(link => {
        return <li key={link.href}>
          <IconLink className={"gap-[12px] hover:bg-background-2 justify-center md:justify-start"} iconClassName={"w-8 h-8"} href={link.href} icon={link.icon}>
            <span className={"hidden md:block"}>{link.label}</span>
          </IconLink>
        </li>
      })}
    </ul>
    <div className={"h-0 flex-1"}></div>
    <DashboardCurrentUser></DashboardCurrentUser>
  </nav>
}

export default DashboardNav;
