import * as React from 'react';
import {ContentWithTooltip} from "@/components/Tooltip";

function HTMLElementDemo3() {
    return <div
        className={"font-[600] flex text-xl justify-center rounded-[8px] py-4 px-[8px] w-full bg-[#111] text-[#eee] font-[Monospace]"}>
        <div className={"flex flex-col w-fit"}>
            <div className={"w-fit"}>
                <span>{"<"}</span>
                <span className={"text-blue-300"}>a</span>
                <Attribute keyElement={"href"} valueElement={"https://discord.gg/100devs"}></Attribute>
                <Attribute keyElement={"target"} valueElement={"_blank"}></Attribute>
                <span>{">"}</span>
            </div>
            <div className={"ml-[2ch]"}>This is a link.</div>
            <div className={"w-fit"}>
                <span>{"<"}</span>
                <span>{"/"}</span>
                <span className={"text-blue-300"}>a</span>
                <span>{">"}</span>
            </div>
        </div>
    </div>;
}

function Attribute(props: {
    keyElement?: React.ReactNode
    valueElement?: React.ReactNode
}) {
    return <ContentWithTooltip
        tooltipContent={<p>An attribute has two parts - a case-insensitive key, and a value enclosed
            in a pair of quotation marks - either single or double.</p>}>
        <button className={"inline-flex ml-[1ch] focus-visible:bg-[#222] hover:bg-[#222]"}>
            <div className={"w-fit text-pink-300"}>
            <span>
                {props.keyElement}
            </span>
            </div>
            <div className={"text-yellow-400"}>=</div>
            <div className={"w-fit text-green-300"}>
            <span>
                {"\""}
            </span>
                <span>
                {props.valueElement}
            </span>
                <span>
                {"\""}
            </span>
            </div>
        </button>
    </ContentWithTooltip>;
}

export default HTMLElementDemo3;
