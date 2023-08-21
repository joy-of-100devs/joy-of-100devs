import * as React from 'react';
import Link from "next/link";

function Logo(props: {href?: string, className?: string}) {
  return <Link href={props.href ?? "#"}>
    <span className={"text-[3rem] rounded-[8px] p-[8px] mx-[-4px] flex hover:bg-background-2"}>{"✨"}</span>
  </Link>;
}

export default Logo;
