import IconButton, {IconButtonProps} from "@/components/IconButton/IconButton";
import styles from "@/components/CodePlayground/styles.module.css";
import * as React from "react";

export default function PlaygroundUtilityButton(props: IconButtonProps) {
    return <IconButton {...props} className={`${styles.utilityButton} ${props.className || ''}`}></IconButton>;
}
