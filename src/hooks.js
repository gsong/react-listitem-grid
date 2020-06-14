//@flow strict
import React from "react";

import Constants from "./contexts";
import { useCalculateLayout } from "./lib";

import type { Options } from "./lib/utils";

export const useLayout = (calcOptions: Options) => {
  const constants = React.useContext(Constants);
  const { border, padding, rowGap, width, ...params } = constants;
  const layoutInfo = useCalculateLayout({ ...params, ...calcOptions });

  const containerStyle = {
    boxShadow: `inset 0 0 0 ${padding}px hsl(257, 16%, 90%)`,
    border: `${border}px solid gray`,
    margin: "auto",
    padding,
    width: `${width}%`,
  };
  return { ...constants, ...layoutInfo, containerStyle };
};
