import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
import { useCallback, useEffect, useState } from "react";


export const scrollbarsConfig = {
	className       : "os-theme-light",
	resize          : "both",
	sizeAutoCapable : true,
	paddingAbsolute : true,
	scrollbars : {
    dragScroll: true,
		clickScroll : true,
    autoHide: "leave",
    theme: "os-theme-light"
	},
  textarea : {
    dynWidth       : false,
    dynHeight      : false,
    inheritedAttrs : ["style", "class"]
  }
};

export const useScrollbar = (root, hasScroll, onOverflow, onScrollbarDestroy, forceRerender) => {
  let scrollbars;
  useEffect(() => {
    if (root.current && hasScroll) {
      scrollbars = OverlayScrollbars(root.current, scrollbarsConfig)
      if (scrollbars.state().hasOverflow["x"] && onOverflow) {
        onOverflow();
      }
    }
    return () => {
      if (scrollbars) {
        scrollbars.destroy();
        if (onScrollbarDestroy) {
          onScrollbarDestroy();
        }
      }
    }
  }, [root, hasScroll, forceRerender]);
  return 0;
}