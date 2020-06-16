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
    <Content
      {...{
        flexBasis,
        columnGap,
        rowGap,
        containerStyle,
        containerRef,
        count,
        itemWidth,
      }}
    />
  );
};

// $FlowFixMe
const Content = React.memo(
  ({
    flexBasis,
    columnGap,
    rowGap,
    containerStyle,
    containerRef,
    count,
    itemWidth,
  }) => {
    const cards = useGetCards(count);

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
              width={itemWidth}
              {...card}
              {...{ itemWidth, columnGap, rowGap }}
              key={card.id}
            />
          ))}
        </Flex.Container>
      </section>
    );
  },
);

export default FlexContainer;
