import * as React from 'react';
import Tooltip, {ContentWithTooltip} from "@/components/Tooltip";
import styles from './styles.module.css';

function AbsoluteURLDemo() {
    return <div
        className={"font-[600] flex flex-wrap items-center font-[Monospace] text-lg lg:text-xl justify-center rounded-[8px] py-4 px-[8px] w-full bg-[#111] text-[#eee]"}>
        <ContentWithTooltip
            tooltipContent={
                <>
                    <p>This is the URL protocol - it&apos;s the method with which the client tries to connect to the
                        server.</p>
                    <p>In a webpage, the protocol is usually <code>http</code> or <code>https</code>.</p>
                    <p>You should try to use <code>https</code> most of the time as this protocol is more secure
                        than the <code>http</code> counterpart.</p>
                </>
            }
        >
            <button className={"w-fit hover:bg-[#222] focus-visible:bg-[#222] text-yellow-300"}>
                https
            </button>
        </ContentWithTooltip>
        <span>://</span>
        <ContentWithTooltip tooltipContent={<p>The name of the website. This allows your computer to get access to the
            right server instead of any random server.</p>}>
            <button className={"w-fit hover:bg-[#222] focus-visible:bg-[#222] text-green-300"}>
                recipes.example.com
            </button>
        </ContentWithTooltip>
        <ContentWithTooltip tooltipContent={
            <p>This part is the root-relative URL that you have learned about!</p>
        }>
            <button className={`${styles.wrap} w-fit hover:bg-[#222] focus-visible:bg-[#222] text-blue-300`}>
                /recipes/index.html
            </button>
        </ContentWithTooltip>
    </div>;
}

export default AbsoluteURLDemo;
