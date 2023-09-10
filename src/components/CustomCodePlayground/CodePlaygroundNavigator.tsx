import React from "react";
import IconButton from "@/components/IconButton";
import {IconType} from "react-icons";
import styles from './CodePlaygroundNavigator.module.css';
import {AiOutlineHome, AiOutlineLeft, AiOutlineReload, AiOutlineRight} from "react-icons/ai";
import {NavigatorContext} from "@/components/CustomCodePlayground/CodePlaygroundIFrame";
import {TbPlayerTrackPrev} from "react-icons/tb";

function NavigatorIconButton(props: {
    icon: IconType,
    onClick?: () => void,
    title?: string,
}) {
    return <IconButton onClick={props.onClick} type={"button"} title={props.title} icon={props.icon} className={styles.navigatorButton}
                       iconClassName={styles.navigatorButtonIcon}></IconButton>;
}

function CodePlaygroundNavigator() {
    const {url, setUrl, back, refresh, forward, goToStartRoute} = React.useContext(NavigatorContext);
    const [tempUrl, setTempUrl] = React.useState<string>();

    let truncatedUrl: string;
    try {
        const parsedUrl = new URL(url);
        truncatedUrl = parsedUrl.pathname;
    } catch (e) {
        truncatedUrl = url
    }

    return <form className={"flex items-center gap-[8px] py-1 px-[8px]"} onSubmit={e => {
        e.preventDefault();
        if (tempUrl) {
            setUrl(tempUrl);
        }
    }}>
        <NavigatorIconButton icon={AiOutlineLeft} title={"Back"} onClick={back}></NavigatorIconButton>
        <NavigatorIconButton icon={AiOutlineRight} title={"Forward"} onClick={forward}></NavigatorIconButton>
        <NavigatorIconButton icon={AiOutlineReload} title={"Reload"} onClick={refresh}></NavigatorIconButton>
        <NavigatorIconButton icon={TbPlayerTrackPrev} title={"Go to start point"} onClick={goToStartRoute}></NavigatorIconButton>
        <input className={"p-[4px] flex-1 bg-[#0003]"} value={tempUrl ?? truncatedUrl} onChange={(e) => {
            setTempUrl(e.target.value);
        }} onFocus={() => {
            setTempUrl(truncatedUrl);
        }} onBlur={() => {
            setTempUrl(undefined);
        }}></input>
    </form>;
}

export default React.memo(CodePlaygroundNavigator);
