//@flow strict
/** @jsx jsx */
import { jsx } from "@emotion/core";

import Card from "./Card";
import { Flex } from "../lib";
import { useLayout } from "./hooks";

import "../lib/Flex/styles.css";

type Props = {
  maximizeItemsPerRow?: boolean,
  observeMaxRows?: boolean,
};

const FlexContainer = ({
  maximizeItemsPerRow = false,
  observeMaxRows = false,
}: Props) => {
  const {
    adjustedItemWidth,
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
      <h3>Flex ({adjustedItemWidth}px)</h3>
      <Flex.Container
        {...{ columnGap, rowGap }}
        css={containerStyle}
        ref={containerRef}
      >
        {cards.map((card) => (
          <Card
            component={Flex.Item}
            itemWidth={adjustedItemWidth}
            {...card}
            {...{ columnGap, rowGap }}
            key={card.id}
          />
        ))}
      </Flex.Container>
    </section>
  );
};

export default FlexContainer;
