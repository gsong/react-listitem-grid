//@flow strict
import { calculateItemWidthWithCount } from "..";

test.each([
  [
    "itemCount > rowCount",
    {
      itemCount: 100,
      rowCount: 4,
    },
    244,
  ],
  [
    "itemCount < rowCount",
    {
      itemCount: 3,
      rowCount: 4,
    },
    300,
  ],
])("%s", (_, params, expected) => {
  expect(
    calculateItemWidthWithCount({
      columnGap: 16,
      containerWidth: 1024,
      maxItemWidth: 300,
      ...params,
    }),
  ).toBe(expected);
});
