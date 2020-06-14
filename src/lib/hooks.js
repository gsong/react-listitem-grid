//@flow strict
import React from "react";
import { useRect } from "@reach/rect";

import { calculateItemWidth } from "./utils.js";

import type { Params } from "./utils.js";

export const useCalculateLayout = (calcParams: Params) => {
  const containerRef = React.useRef<?HTMLElement>();
  const rect = useRect(containerRef);

  const containerWidth = rect?.width ?? 1024;
  const calculatedValues = calculateItemWidth({
    containerWidth,
    ...calcParams,
  });

  return {
    containerRef,
    ...calculatedValues,
  };
};
