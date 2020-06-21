//@flow strict
export type Options = {|
  maximizeItemsPerRow?: boolean,
  isFlex?: boolean,
|};

export type Params = {|
  ...Options,
  columnGap: number,
  itemCount: number,
  maxItemWidth: number,
  minItemWidth: number,
  maxRows: number,
|};

export const calculateItemWidth = ({
  containerWidth: _containerWidth,
  columnGap,
  itemCount,
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

  const count = Math.min(
    maximizeItemsPerRow
      ? maxCount
      : maxCount - minCount > 0
      ? minCount + 1
      : minCount,
    itemCount,
  );

  const itemWidth = Math.floor(
    Math.min(
      ((containerWidth ?? maxItemWidth) - (count - 1) * columnGap) / count,
      maxItemWidth,
    ),
  );

  let itemRenderCount = itemCount;
  if ((maxRows ?? 0) > 0) {
    const rows = Math.ceil(itemCount / count);
    itemRenderCount = rows > maxRows ? count * maxRows : itemCount;
  }

  return { containerWidth, itemWidth, itemRenderCount };
};

type GapParams = {| columnGap: number, rowGap: number |};

export const flexCompensate = {
  container: ({ columnGap, rowGap }: GapParams) => {
    const margin = `-${rowGap}px 0 0 -${columnGap}px`;
    const width = `calc(100% + ${columnGap}px)`;
    return { margin, width };
  },

  item: ({
    itemWidth,
    columnGap,
    rowGap,
  }: {|
    itemWidth: number,
    ...GapParams,
  |}) => {
    const flexBasis = itemWidth;
    const margin = `${rowGap}px 0 0 ${columnGap}px`;
    return { flexBasis, margin };
  },
};
