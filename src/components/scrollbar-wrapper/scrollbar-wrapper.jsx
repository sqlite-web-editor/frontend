import React, { useRef, useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import { scrollbarsConfig } from "../../hooks/use-scrollbar";
import "./scrollbar-wrapper.css";

export const ScrollbarWrapper = ({ children, hasScroll, onOverflow, onScrollbarDestroy, forceUpdate }) => {
  const divRef = useRef(null);

  useEffect(() => {

    if (divRef.current && hasScroll) {
      const scrollbars = OverlayScrollbars(divRef.current, scrollbarsConfig);

      if (scrollbars.state().hasOverflow["x"] && onOverflow) {
        onOverflow(divRef);
      }

      return () => {
        scrollbars.destroy();
        onScrollbarDestroy(divRef);
      };
    }
  }, [hasScroll, forceUpdate]);

  return (
    <div ref={divRef}>
      {children}
    </div>
  );
};