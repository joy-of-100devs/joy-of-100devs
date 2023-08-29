declare module "*.svg" {
    import React from "react";

    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "svgdom" {
    export function createSVGWindow(): Window
}
