//@flow strict
import React from "react";

import Constants from "./contexts";
import { useCalculateLayout } from "../lib";

import type { Options } from "../lib/utils";

export const useLayout = (calcOptions: Options) => {
  const constants = React.useContext(Constants);
  const { border, padding, rowGap, width, ...params } = constants;
  const layoutInfo = useCalculateLayout({ ...params, ...calcOptions });

  const containerStyle = React.useMemo(
    () => ({
      // boxShadow: `inset 0 0 0 ${padding}px hsl(257, 16%, 90%)`,
      border: `${border}px solid lightgray`,
      margin: "auto",
      padding,
      width: `${width}%`,
    }),
    [border, padding, width],
  );

  return { ...constants, ...layoutInfo, containerStyle };
};

export const useClickableContent = () => {
  const link = React.useRef<HTMLElement | typeof undefined>();
  let down;

  const onMouseDown = () => (down = Date.now());
  const onMouseUp = () => {
    const elapsed = Date.now() - down;
    if (elapsed < 200) {
      // eslint-disable-next-line no-unused-expressions
      link.current?.click();
    }
  };

  return [link, { onMouseDown, onMouseUp }];
};
