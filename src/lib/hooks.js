//@flow strict
import React from "react";

import { calculateLayoutSpec } from "./utils.js";

import type { Params } from "./utils.js";

export const useCalculateLayout = (calcParams: Params) => {
  const containerRef = React.useRef<?HTMLElement>();

  const [containerWidth, setContainerWidth] = React.useState(1024);

  const observer = React.useRef();

  !observer.current &&
    (async () => {
      let ResizeObserver = window.ResizeObserver;

      if (!("ResizeObserver" in window)) {
        const module = await import("@juggle/resize-observer");
        ResizeObserver = module.ResizeObserver;
      }

      observer.current = new ResizeObserver((entries) => {
        entries.forEach((entry) => setContainerWidth(entry.contentRect.width));
      });
    })();

  React.useEffect(() => {
    containerRef.current &&
      observer.current &&
      observer.current.observe(containerRef.current);
    return () => observer.current && observer.current.disconnect();
  });

  const calculatedValues = calculateLayoutSpec({
    containerWidth,
    ...calcParams,
  });

  return {
    containerRef,
    ...calculatedValues,
  };
};
