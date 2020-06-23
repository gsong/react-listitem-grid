//@flow strict
export type Options = {|
  maximizeItemsPerRow?: boolean,
  isFlex?: boolean,
|};

export type Params = {|
  ...Options,
  columnGap: number,
  maxItemWidth: number,
  minItemWidth: number,
  maxRows?: number,
|};

export const calculateLayoutSpec = ({
  containerWidth: _containerWidth,
  columnGap,
  maxItemWidth: _maxItemWidth,
  minItemWidth,
  maxRows,
  maximizeItemsPerRow = false,
  isFlex = false,
}: {|
  ...Params,
  containerWidth: number,
|}) => {
  const containerWidth = isFlex ? _containerWidth - columnGap : _containerWidth;
  const maxItemWidth =
    _maxItemWidth < minItemWidth ? minItemWidth : _maxItemWidth;

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
  columnGap: number,
  containerWidth: number,
  itemCount: number,
  maxItemWidth: number,
  rowCount: number,
|};

export const calculateItemWidthWithCount = ({
  itemCount,
  rowCount,
  ...rest
}: ItemWidthParams) => {
  const itemWidth = calculateItemWidth({
    ...rest,
    rowCount: Math.min(itemCount, rowCount),
  });
  return itemWidth;
};

const calculateItemWidth = ({
  columnGap,
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

type GapParams = {| columnGap: number, rowGap: number |};

export const flexCompensate = {
  container: ({ columnGap, rowGap }: GapParams) => {
    const margin = `-${rowGap}px 0 0 -${columnGap}px`;
    const width = `calc(100% + ${columnGap}px)`;
    return { margin, width };
  },

  item: ({ columnGap, rowGap }: GapParams) => {
    const margin = `${rowGap}px 0 0 ${columnGap}px`;
    return { margin };
  },
};
