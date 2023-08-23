"use client";

import * as React from 'react';
import Image from "next/image";
import Avatar from 'boring-avatars';
import styles from './styles.module.css';

// TODO: Color theme overhaul please
const COLOR_THEME = ["#f8f69f", "#bab986", "#7c7b6c", "#3e3e53", "#000039"];
function UserAvatar(props: { userName: string, image?: string, className?: string }) {
    if (props.image) {
        return <Image src={props.image} alt={props.userName} width={120} height={120}
                      className={`${props.className} flex-none border-[2px] border-accent-4 rounded-full w-12 h-12`}></Image>;
    } else {
        return <div className={`w-12 h-12 flex-none border-[2px] border-accent-4 overflow-x-hidden rounded-full ${styles.defaultAvatar}`}>
            <Avatar name={props.userName} variant={"beam"} size={120} square={true} colors={COLOR_THEME}></Avatar>
        </div>;
    }
}

export default UserAvatar;
