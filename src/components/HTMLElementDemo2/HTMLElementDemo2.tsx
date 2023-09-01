import * as React from 'react';
import {ContentWithTooltip} from "@/components/Tooltip";

function HTMLElementDemo2() {
    return <div className={"font-[600] flex text-xl justify-center rounded-[8px] py-4 px-[8px] w-full bg-[#111] text-[#eee] font-[Monospace]"}>
        <div className={"flex flex-col w-fit"}>
            <div className={"w-fit"}>
                <span>{"<"}</span>
                <span className={"text-blue-300"}>ul</span>
                <span>{">"}</span>
            </div>
            <ContentWithTooltip tooltipContent={<p>For example, a list can have multiple list items!</p>}>
                <button className={"ml-[2ch] hover:bg-[#222] focus-visible:bg-[#222]"}>
                    <Item>Egg</Item>
                    <Item>Wheat flour</Item>
                    <Item>Cream</Item>
                    <Item>Strawberry</Item>
                </button>
            </ContentWithTooltip>
            <div className={"w-fit"}>
                <span>{"<"}</span>
                <span>{"/"}</span>
                <span className={"text-blue-300"}>ul</span>
                <span>{">"}</span>
            </div>
        </div>
    </div>;
}

function Item(props: {
    children?: React.ReactNode
}) {
    return <div className={"flex"}>
        <div className={"w-fit"}>
            <span>{"<"}</span>
            <span className={"text-blue-300"}>li</span>
            <span>{">"}</span>
        </div>
        <span>{props.children}</span>
        <div className={"w-fit"}>
            <span>{"<"}</span>
            <span>{"/"}</span>
            <span className={"text-blue-300"}>li</span>
            <span>{">"}</span>
        </div>
    </div>;
}

export default HTMLElementDemo2;
