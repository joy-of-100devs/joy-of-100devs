import IconButton, {IconButtonProps} from "@/components/IconButton/IconButton";
import styles from "@/components/CodePlayground/PlaygroundUtilityButton.module.css";
import * as React from "react";
import {UnstyledOpenInCodeSandboxButton} from "@codesandbox/sandpack-react/unstyled";
import {RxOpenInNewWindow} from "react-icons/rx";

export default function PlaygroundUtilityButton(props: IconButtonProps) {
    return <IconButton {...props} className={`${styles.utilityButton} ${props.className || ''}`}
                       iconClassName={styles.utilityButtonIcon}></IconButton>;
}

export function CodeSandboxButton() {
    return <UnstyledOpenInCodeSandboxButton
        className={`${styles.utilityButton}`}>
        <RxOpenInNewWindow className={styles.utilityButtonIcon}></RxOpenInNewWindow>
    </UnstyledOpenInCodeSandboxButton>;
}
