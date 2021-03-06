//@flow strict
import defaults from "../defaults.js";

import type { Gaps } from "../types";

export type Options = {|
  maximizeItemsPerRow?: boolean,
  isFlex?: boolean,
|};

export type Params = {|
  ...Options,
  columnGap?: number,
  maxItemWidth: number,
  minItemWidth?: number,
  maxRows?: number,
|};

export const calculateLayoutSpec = ({
  containerWidth: _containerWidth,
  columnGap = defaults.columnGap,
  maxItemWidth: _maxItemWidth,
  minItemWidth = 0,
  maxRows,
  maximizeItemsPerRow = false,
  isFlex = false,
}: {|
  ...Params,
  containerWidth: number,
|}): {|
  containerWidth: number,
  desiredItemCount: ?number,
  itemWidth: number,
  rowCount: number,
|} => {
  const containerWidth = isFlex ? _containerWidth - columnGap : _containerWidth;
  const maxItemWidth = Math.max(_maxItemWidth, minItemWidth);

  const maxCount = Math.max(
    Math.floor(
      ((containerWidth ?? minItemWidth) + columnGap) /
        (minItemWidth + columnGap),
    ),
    1,
  );

  const minCount = Math.max(
    Math.floor(
      ((containerWidth ?? maxItemWidth) + columnGap) /
        (maxItemWidth + columnGap),
    ),
    1,
  );

  const rowCount = maximizeItemsPerRow
    ? maxCount
    : maxCount - minCount > 0
    ? minCount + 1
    : minCount;

  const itemWidth = calculateItemWidth({
    containerWidth,
    maxItemWidth,
    rowCount,
    columnGap,
  });

  const desiredItemCount =
    maxRows !== undefined && maxRows > 0 ? maxRows * rowCount : undefined;

  return { containerWidth, itemWidth, rowCount, desiredItemCount };
};

type ItemWidthParams = {|
  columnGap?: number,
  containerWidth: number,
  itemCount: number,
  maxItemWidth: number,
  rowCount: number,
|};

export const calculateItemWidthWithCount = ({
  itemCount,
  rowCount,
  ...rest
}: ItemWidthParams): number => {
  const itemWidth = calculateItemWidth({
    ...rest,
    rowCount: Math.min(itemCount, rowCount),
  });
  return itemWidth;
};

const calculateItemWidth = ({
  columnGap = defaults.columnGap,
  containerWidth,
  maxItemWidth,
  rowCount,
}) =>
  Math.floor(
    Math.min(
      ((containerWidth ?? maxItemWidth) - (rowCount - 1) * columnGap) /
        rowCount,
      maxItemWidth,
    ),
  );

export const flexCompensate = {
  container: ({
    columnGap = defaults.columnGap,
    rowGap = defaults.rowGap,
  }: Gaps): {| margin: string, width: string |} => {
    const margin = `-${rowGap}px 0 0 -${columnGap}px`;
    const width = `calc(100% + ${columnGap}px)`;
    return { margin, width };
  },

  item: ({
    columnGap = defaults.columnGap,
    rowGap = defaults.rowGap,
  }: Gaps): {| margin: string |} => {
    const margin = `${rowGap}px 0 0 ${columnGap}px`;
    return { margin };
  },
};
