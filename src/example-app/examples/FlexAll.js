//@flow strict
/** @jsx jsx */
import * as React from "react";
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
const minItemWidth = 150;
const rowGap = 16;

export default function FlexAll(): React.Element<typeof Flex.Container> {
  const { containerWidth, rowCount, containerRef } = useCalculateLayout({
    columnGap,
    maxItemWidth,
    minItemWidth,
    isFlex: true,
  });

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/cards/")
      .then((response) => response.json())
      .then(({ cards }) => setCards(cards));
  }, []);

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
      {cards.map((card) => (
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
