//@flow strict
/** @jsx jsx */
import React from "react";
import {
  Flex,
  calculateItemWidthWithCount,
  useCalculateLayout,
} from "react-listitem-grid";
import { jsx } from "@emotion/core";

import CardContent from "../components/CardContent";
import { itemStyle } from "../styles";

import "react-listitem-grid/Flex/styles.css";

const columnGap = 16;
const maxItemWidth = 350;
const maxRows = 1;
const maximizeItemsPerRow = false;
const minItemWidth = 150;
const rowGap = 16;

export default function FlexMaxRows() {
  const {
    containerWidth,
    rowCount,
    desiredItemCount,
    containerRef,
  } = useCalculateLayout({
    columnGap,
    maxItemWidth,
    maxRows,
    minItemWidth,
    maximizeItemsPerRow,
    isFlex: true,
  });

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    if (desiredItemCount && cards.length < desiredItemCount) {
      fetch(`/api/cards/?count=${desiredItemCount}`)
        .then((response) => response.json())
        .then(({ cards }) => setCards(cards));
    }
  }, [cards.length, desiredItemCount]);

  const itemWidth = calculateItemWidthWithCount({
    columnGap,
    containerWidth,
    itemCount: cards.length,
    maxItemWidth,
    rowCount,
  });

  return (
    <Flex.Container
      {...{ columnGap, rowGap }}
      css={{ padding: 8, width: "70%" }}
      ref={containerRef}
    >
      {cards.slice(0, desiredItemCount).map((card) => (
        <Flex.Item
          {...{ itemWidth, columnGap, rowGap }}
          css={itemStyle}
          key={card.id}
        >
          <CardContent {...card} {...{ itemWidth }} />
        </Flex.Item>
      ))}
    </Flex.Container>
  );
}
