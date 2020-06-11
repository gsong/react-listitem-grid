import React from "react";
import { useRect } from "@reach/rect";

import { calculateItemWidth } from "./utils.js";

export const useCalculateLayout = (calcParams) => {
  const containerRef = React.useRef();
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
