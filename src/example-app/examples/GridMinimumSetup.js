//@flow strict
/** @jsx jsx */
import React from "react";
import {
  Grid,
  calculateItemWidthWithCount,
  useCalculateLayout,
} from "react-listitem-grid";
import { jsx } from "@emotion/core";

import CardContent from "../components/CardContent";
import { itemStyle } from "../styles";

import "react-listitem-grid/Grid/styles.css";

const maxItemWidth = 350;
const minItemWidth = 150;

export default function GridMinimumSetup() {
  const { containerWidth, rowCount, containerRef } = useCalculateLayout({
    maxItemWidth,
    minItemWidth,
  });

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/cards/")
      .then((response) => response.json())
      .then(({ cards }) => setCards(cards));
  }, []);

  const itemWidth = calculateItemWidthWithCount({
    containerWidth,
    itemCount: cards.length,
    maxItemWidth,
    rowCount,
  });

  return (
    <Grid.Container {...{ itemWidth }} ref={containerRef}>
      {cards.map((card) => (
        <Grid.Item css={itemStyle} key={card.id}>
          <CardContent {...card} {...{ itemWidth }} />
        </Grid.Item>
      ))}
    </Grid.Container>
  );
}
