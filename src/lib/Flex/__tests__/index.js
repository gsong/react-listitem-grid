//@flow strict
import React from "react";
import { render } from "@testing-library/react";

import Flex from "..";

const children = "fixed-snapshot-children";

describe("Flex.Container", () => {
  test("renders properly", () => {
    const { container } = render(<Flex.Container>{children}</Flex.Container>);
    expect(container).toMatchSnapshot();
  });

  test("renders properly with optional params", () => {
    const { container } = render(
      <Flex.Container columnGap={16} rowGap={8}>
        {children}
      </Flex.Container>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe("Flex.Item", () => {
  test("renders properly", () => {
    const { container } = render(
      <Flex.Item itemWidth={150}>{children}</Flex.Item>,
    );
    expect(container).toMatchSnapshot();
  });

  test("renders properly with optional params", () => {
    const { container } = render(
      <Flex.Item itemWidth={150} columnGap={16} rowGap={8}>
        {children}
      </Flex.Item>,
    );
    expect(container).toMatchSnapshot();
  });
});
