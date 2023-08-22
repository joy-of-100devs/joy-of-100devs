import * as React from "react";
import {createSVGWindow} from "svgdom";

export async function renderAsHeadlessElement<Output>(element: React.ReactElement) {
    const {renderToStaticMarkup} = await import("react-dom/server");
    const markup = renderToStaticMarkup(element);
    const headlessWindow = createSVGWindow();
    const headlessDoc = headlessWindow.document;
    const container = headlessDoc.createElement("div");
    container.innerHTML = markup;
    return container.childNodes[0] as Output;
}
