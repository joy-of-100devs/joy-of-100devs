import React from "react";

// A simplified version of the router events.
export function clickShouldStartNavigation(e: React.MouseEvent) {
    // Event must not have any meta key, ctrl key, shift or alt.
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return false;
    }
    const target = e.currentTarget;
    // Element should be an anchor element.
    if (!(target instanceof HTMLAnchorElement) && !(target instanceof SVGAElement)) {
        return false;
    }
    // Element should not open a new tab or target on any other tab.
    const targetedTab = target.getAttribute("target");
    if (targetedTab && targetedTab !== "_self") {
        return false;
    }
    // Prevents right click.
    if (e.nativeEvent && e.nativeEvent.button === 1) {
        return false;
    }
    return true;
}
