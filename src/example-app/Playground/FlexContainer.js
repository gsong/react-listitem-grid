//@flow strict
/** @jsx jsx */
import { Flex } from "react-listitem-grid";
import { jsx } from "@emotion/core";

import CardContent from "../components/CardContent";
import { itemStyle } from "../styles";
import { useLayout } from "./hooks";

import "react-listitem-grid/Flex/styles.css";

type Props = {
  maximizeItemsPerRow?: boolean,
  observeMaxRows?: boolean,
};

const FlexContainer = ({
  maximizeItemsPerRow = false,
  observeMaxRows = false,
}: Props) => {
  const {
    adjustedItemWidth: itemWidth,
    cards,
    columnGap,
    containerRef,
    containerStyle,
    rowGap,
  } = useLayout({
    maximizeItemsPerRow,
    isFlex: true,
    observeMaxRows,
  });

  return (
    <section>
      <h3>Flex ({itemWidth}px)</h3>
      <Flex.Container
        {...{ columnGap, rowGap }}
        css={containerStyle}
        ref={containerRef}
      >
        {cards.map((card) => (
          <Flex.Item
            {...{ columnGap, itemWidth, rowGap }}
            css={itemStyle}
            key={card.id}
          >
            <CardContent {...card} {...{ itemWidth }} />
          </Flex.Item>
        ))}
      </Flex.Container>
    </section>
  );
};

export default FlexContainer;
