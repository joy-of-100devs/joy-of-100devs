import * as React from 'react';
import {ComponentPropsWithoutRef} from "react";
import {IconType} from "react-icons";
import Link from "next/link";

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
    icon: IconType;
    iconClassName?: string;
}

export interface IconLinkProps extends ComponentPropsWithoutRef<"a"> {
    href: string;
    icon: IconType;
    iconClassName?: string;
}


function IconButton({icon, iconClassName, ...props}: IconButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
    const Icon = icon;

    return <button ref={ref} {...props}
                   className={`flex gap-[8px] p-[12px] font-[600] px-[16px] rounded-[8px] items-center bg-background-1 ${props.className ?? ''}`}>
        <Icon className={`w-6 h-6 ${iconClassName ?? ''}`}></Icon>
        {props.children}
    </button>;
}

function _IconLink({icon, iconClassName, ...props}: IconLinkProps, ref: React.ForwardedRef<HTMLAnchorElement | null>) {
    const Icon = icon;

    return <Link
        ref={ref}
        {...props}
        className={`flex gap-[12px] p-[12px] px-[16px] font-[600] rounded-[8px] items-center bg-background-1 ${props.className ?? ''}`}>
        <Icon className={`w-6 h-6 ${iconClassName ?? ''}`}></Icon>
               {props.children}
    </Link>;
}

export default React.memo(React.forwardRef(IconButton));
export const IconLink = React.memo(React.forwardRef(_IconLink));
