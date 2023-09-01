import * as React from 'react';
import Tooltip, {ContentWithTooltip} from "@/components/Tooltip";

function HTMLElementDemo() {
    return <div
        className={"grid grid-cols-[repeat(3,_auto)] font-[600] text-xl justify-center rounded-[8px] py-4 px-[8px] w-full bg-[#111] text-[#eee]"}>
        <ContentWithTooltip
            tooltipContent={
                <>
                    <p>The opening tag - it tells the web browser what the element you want to show.</p>
                    <p>It starts with a less-than sign, followed by the name of the tag, plus some attributes
                        that we&apos;ll learn later, and ends with a greater-than sign.</p>
                </>
            }
        >
            <button className={"w-fit font-[Monospace] hover:bg-[#222] focus-visible:bg-[#222]"}>
                    <span>
                        {"<"}
                    </span>
                <span className={"text-blue-300"}>
                        h1
                    </span>
                <span>
                        {">"}
                    </span>
            </button>
        </ContentWithTooltip>
        <ContentWithTooltip tooltipContent={<p>The content of the tag. It can be some text or other tags.</p>}>
            <button className={"w-fit font-[Monospace] hover:bg-[#222] focus-visible:bg-[#222]"}>
                Hello World!
            </button>
        </ContentWithTooltip>
        <ContentWithTooltip tooltipContent={
            <p>The closing tag. It&apos;s the same as the opening tag, but there must be a forward slash after a
                greater-than sign. You also can&apos;t put attributes here.</p>
        }>
            <button className={"w-fit font-[Monospace] hover:bg-[#222] focus-visible:bg-[#222]"}>
            <span>
                {"<"}
            </span>
                <span>
                {"/"}
            </span>
                <span className={"text-blue-300"}>
                h1
            </span>
                <span>
                {">"}
            </span>
            </button>
        </ContentWithTooltip>
    </div>;
}

export default HTMLElementDemo;
