//@flow strict
import React from "react";

import Constants from "./contexts";
import { useCalculateLayout } from "../lib";

import type { Options } from "../lib/utils";

export const useLayout = (calcOptions: Options) => {
  const constants = React.useContext(Constants);
  const { alignment, border, padding, rowGap, width, ...params } = constants;
  const layoutInfo = useCalculateLayout({ ...params, ...calcOptions });

  const containerStyle = React.useMemo(
    () => [
      {
        border: `${border}px solid lightgray`,
        margin: "auto",
        padding,
        width: `${width}%`,
      },
      alignment === "left"
        ? { marginLeft: 0 }
        : alignment === "right"
        ? { marginRight: 0 }
        : {},
    ],
    [alignment, border, padding, width],
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

export const useGetCards = (count: number) => {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    fetch(`/api/cards/?count=${count}`)
      .then((response) => response.json())
      .then(({ cards }) => setCards(cards));
  }, [count]);
  return cards;
};
