"use client";

import * as React from 'react';
import * as _Tooltip from '@radix-ui/react-tooltip';

function Tooltip(props: {
  trigger?: React.ReactNode
  children?: React.ReactNode
}) {
  const trigger = props.trigger ?? <span>*</span>

  return <_Tooltip.Provider>
    <_Tooltip.Root delayDuration={200}>
      <_Tooltip.Trigger asChild={true}>
        {trigger}
      </_Tooltip.Trigger>
      <_Tooltip.Portal>
        <_Tooltip.Content sideOffset={8} className={"bg-background-2 rounded-[8px] py-2 px-[12px] z-[1] max-w-lg shadow-background-1 shadow-md"} collisionPadding={8}>
          {props.children}
        </_Tooltip.Content>
      </_Tooltip.Portal>
    </_Tooltip.Root>
  </_Tooltip.Provider>;
}

export function ContentWithTooltip(props: {
  tooltipContent?: React.ReactNode
  children?: React.ReactNode
}) {
  return <Tooltip trigger={props.children}>{props.tooltipContent}</Tooltip>
}

export default Tooltip;
