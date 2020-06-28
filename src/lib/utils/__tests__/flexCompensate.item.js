//@flow strict
import faker from "faker";

import { flexCompensate } from "..";

const columnGap = faker.random.number();
const rowGap = faker.random.number();

test.each([
  [{}, { margin: "0px 0 0 0px" }],
  [{ columnGap, rowGap }, { margin: `${rowGap}px 0 0 ${columnGap}px` }],
])("with params %p", (params, expected) => {
  expect(flexCompensate.item(params)).toMatchObject(expected);
});
