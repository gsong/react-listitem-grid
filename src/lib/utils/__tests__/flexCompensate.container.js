//@flow strict
import faker from "faker";

import { flexCompensate } from "..";

const columnGap = faker.random.number();
const rowGap = faker.random.number();

test.each([
  [
    {},
    {
      margin: "-0px 0 0 -0px",
      width: "calc(100% + 0px)",
    },
  ],
  [
    { columnGap, rowGap },
    {
      margin: `-${rowGap}px 0 0 -${columnGap}px`,
      width: `calc(100% + ${columnGap}px)`,
    },
  ],
])("with params %p", (params, expected) => {
  expect(flexCompensate.container(params)).toMatchObject(expected);
});
