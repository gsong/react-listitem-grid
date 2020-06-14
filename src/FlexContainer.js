//@flow strict
/** @jsx jsx */
import range from "lodash/range";
import { jsx } from "@emotion/core";

import { Flex, flexCompensate } from "./lib";
import { useLayout } from "./hooks";

import "./lib/Flex/styles.css";

type Props = {
  maximizeItemsPerRow?: boolean,
  observeMaxRows?: boolean,
};

const FlexContainer = ({
  maximizeItemsPerRow = false,
  observeMaxRows = false,
}: Props) => {
  const {
    columnGap,
    containerRef,
    containerStyle,
    itemCount,
    itemRenderCount,
    itemWidth,
    rowGap,
  } = useLayout({ maximizeItemsPerRow, isFlex: true });

  const { flexBasis } = flexCompensate.item({ itemWidth, columnGap, rowGap });
  const count = observeMaxRows ? itemRenderCount : itemCount;

  return (
    <section>
      <h3>Flex ({flexBasis}px)</h3>
      <Flex.Container
        {...{ columnGap, rowGap }}
        css={containerStyle}
        ref={containerRef}
      >
        {range(count).map((i) => (
          <Flex.Item
            {...{ itemWidth, columnGap, rowGap }}
            css={{
              backgroundColor: maximizeItemsPerRow ? "green" : "red",
              color: "white",
            }}
            key={i}
          >
            Hi
          </Flex.Item>
        ))}
      </Flex.Container>
    </section>
  );
};

export default FlexContainer;
