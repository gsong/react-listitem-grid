//@flow strict
import { calculateLayoutSpec } from "..";

const baseParams = { containerWidth: 1024, maxItemWidth: 300 };

test.each([
  [{}, { itemWidth: 256, rowCount: 4 }],
  [{ columnGap: 8 }, { itemWidth: 250, rowCount: 4 }],
  [
    { maximizeItemsPerRow: true, minItemWidth: 150 },
    { itemWidth: 170, rowCount: 6 },
  ],
  [
    { columnGap: 8, maximizeItemsPerRow: true, minItemWidth: 150 },
    { itemWidth: 164, rowCount: 6 },
  ],
  [{ maxRows: 2 }, { desiredItemCount: 8 }],
  [
    { maxRows: 2, maximizeItemsPerRow: true, minItemWidth: 150 },
    { desiredItemCount: 12 },
  ],
  [
    { minItemWidth: 200, maxItemWidth: 100 },
    { itemWidth: 200, rowCount: 5 },
  ],
])("for CSS grid, %p", (params, expected) => {
  expect(calculateLayoutSpec({ ...baseParams, ...params })).toMatchObject({
    ...expected,
  });
});

test.each([
  [{}, { itemWidth: 256, rowCount: 4, containerWidth: 1024 }],
  [{ columnGap: 8 }, { itemWidth: 248, rowCount: 4, containerWidth: 1016 }],
  [
    { maximizeItemsPerRow: true, minItemWidth: 150 },
    { itemWidth: 170, rowCount: 6 },
  ],
  [
    { columnGap: 8, maximizeItemsPerRow: true, minItemWidth: 150 },
    { itemWidth: 162, rowCount: 6 },
  ],
  [{ maxRows: 2 }, { desiredItemCount: 8 }],
  [
    { maxRows: 2, maximizeItemsPerRow: true, minItemWidth: 150 },
    { desiredItemCount: 12 },
  ],
  [
    { minItemWidth: 200, maxItemWidth: 100 },
    { itemWidth: 200, rowCount: 5 },
  ],
])("for CSS flex, %p", (params, expected) => {
  expect(
    calculateLayoutSpec({ ...baseParams, ...params, isFlex: true }),
  ).toMatchObject({ ...expected });
});
