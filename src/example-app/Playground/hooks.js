//@flow strict
import React from "react";
import {
  calculateItemWidthWithCount,
  useCalculateLayout,
} from "react-listitem-grid";

import Constants from "./contexts";

import type { Options } from "react-listitem-grid/utils";

type CalcOptions = {| ...Options, observeMaxRows: boolean |};

export const useLayout = ({ observeMaxRows, ...calcOptions }: CalcOptions) => {
  const constants = React.useContext(Constants);
  const {
    alignment,
    border,
    itemCount,
    padding,
    rowGap,
    width,
    ...params
  } = constants;
  const layoutInfo = useCalculateLayout({ ...params, ...calcOptions });

  const count =
    observeMaxRows && layoutInfo.desiredItemCount !== 0
      ? layoutInfo.desiredItemCount ?? itemCount
      : itemCount;

  const { cards, adjustedItemWidth } = useGetCards({
    ...layoutInfo,
    ...params,
    count,
    itemCount,
    observeMaxRows,
  });

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

  return {
    ...constants,
    ...layoutInfo,
    count,
    containerStyle,
    cards,
    adjustedItemWidth,
  };
};

type HookParams = {
  columnGap: number,
  containerWidth: number,
  count: number,
  itemCount: number,
  maxItemWidth: number,
  observeMaxRows: boolean,
  rowCount: number,
};

export const useGetCards = ({
  columnGap,
  containerWidth,
  count,
  itemCount,
  maxItemWidth,
  observeMaxRows,
  rowCount,
}: HookParams) => {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const route = observeMaxRows ? "" : "init/";

    fetch(`/api/cards/${route}?count=${count}`)
      .then((response) => response.json())
      .then(({ cards }) => setCards(cards));
  }, [count, observeMaxRows, itemCount]);

  const adjustedItemWidth = calculateItemWidthWithCount({
    columnGap,
    containerWidth,
    itemCount: cards.length,
    maxItemWidth,
    rowCount,
  });

  return { cards, adjustedItemWidth };
};
