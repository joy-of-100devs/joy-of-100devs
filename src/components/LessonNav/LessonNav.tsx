"use client";

import * as React from 'react';
import IconButton from "@/components/IconButton/IconButton";
import {RxHamburgerMenu} from "react-icons/rx";

const LessonNavContext = React.createContext({
    mobileShown: false,
    toggleMobileShown: () => {},
    setMobileShown: (mode: boolean) => {},
})

export function LessonNavHamburger() {
    const {toggleMobileShown} = React.useContext(LessonNavContext);
    return <IconButton onClick={toggleMobileShown} className={"md:hidden hover:bg-background-2"} icon={RxHamburgerMenu}></IconButton>;
}

export function LessonNavProvider(props: {children?: React.ReactNode}) {
    const [mobileShown, setMobileShown] = React.useState(false);

    const toggleMobileShown = React.useCallback(() => {
        setMobileShown(s => !s);
    }, []);

    console.log(mobileShown);

    return <LessonNavContext.Provider value={{mobileShown, toggleMobileShown, setMobileShown}}>
        {props.children}
    </LessonNavContext.Provider>
}

function LessonNav(props: { children?: React.ReactNode }) {
    const {mobileShown, setMobileShown} = React.useContext(LessonNavContext);

    return <nav onBlur={e => {
        setMobileShown(false);
    }} className={`${mobileShown ? "absolute flex h-full" : 'hidden'}
        md:flex md:static outline outline-[2px] outline-background-2 md:outline-none flex-col flex-none w-[15rem] bg-background-1 rounded-[8px] p-[8px]`}>
        {props.children}
    </nav>;
}

export default LessonNav;
