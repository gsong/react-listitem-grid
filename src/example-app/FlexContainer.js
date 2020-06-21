//@flow strict
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

import Card from "./Card";
import { Flex, flexCompensate } from "../lib";
import { useGetCards, useLayout } from "./hooks";

import "../lib/Flex/styles.css";

type Props = {
  maximizeItemsPerRow?: boolean,
  observeMaxRows?: boolean,
};

const FlexContainer = ({
  maximizeItemsPerRow = false,
  observeMaxRows = false,
}: Props) => {
  const { itemWidth, columnGap, rowGap, ...layoutInfo } = useLayout({
    maximizeItemsPerRow,
    isFlex: true,
    observeMaxRows,
  });

  return (
    <Content
      {...{
        columnGap,
        rowGap,
        observeMaxRows,
        itemWidth,
      }}
      {...layoutInfo}
    />
  );
};

// $FlowFixMe
const Content = React.memo(
  ({
    columnGap,
    containerRef,
    containerStyle,
    containerWidth,
    count,
    itemCount,
    itemWidth,
    maxItemWidth,
    observeMaxRows,
    rowCount,
    rowGap,
  }) => {
    const { cards, adjustedItemWidth } = useGetCards({
      columnGap,
      containerWidth,
      count,
      itemCount,
      maxItemWidth,
      observeMaxRows,
      rowCount,
    });

    const { flexBasis } = flexCompensate.item({
      itemWidth: adjustedItemWidth,
      columnGap,
      rowGap,
    });

    return (
      <section>
        <h3>Flex ({flexBasis}px)</h3>
        <Flex.Container
          {...{ columnGap, rowGap }}
          css={containerStyle}
          ref={containerRef}
        >
          {cards.map((card) => (
            <Card
              component={Flex.Item}
              width={adjustedItemWidth}
              itemWidth={adjustedItemWidth}
              {...card}
              {...{ columnGap, rowGap }}
              key={card.id}
            />
          ))}
        </Flex.Container>
      </section>
    );
  },
);

export default FlexContainer;
