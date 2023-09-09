import IconButton, {IconButtonProps} from "@/components/IconButton/IconButton";
import * as React from "react";
import styles from './CodePlaygroundUtilityButton.module.css';

export default function PlaygroundUtilityButton(props: IconButtonProps) {
    return <IconButton {...props}
                       className={`${styles.button} ${props.className || ''}`}
                       iconClassName={`${styles.icon}`}></IconButton>;
}
