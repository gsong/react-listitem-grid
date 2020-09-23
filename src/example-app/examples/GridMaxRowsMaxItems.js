//@flow strict
/** @jsx jsx */
import * as React from "react";
import {
  Grid,
  calculateItemWidthWithCount,
  useCalculateLayout,
} from "react-listitem-grid";
import { jsx } from "@emotion/core";

import CardContent from "../components/CardContent";
import { itemStyle } from "../styles";

import "react-listitem-grid/Grid/styles.css";

const columnGap = 16;
const maxItemWidth = 350;
const maxRows = 1;
const maximizeItemsPerRow = true;
const minItemWidth = 150;
const rowGap = 16;

export default function GridMaxRowsMaxItems(): React.Element<
  typeof Grid.Container,
> {
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
    <Grid.Container
      {...{ itemWidth, columnGap, rowGap }}
      css={{ padding: 8, width: "70%" }}
      ref={containerRef}
    >
      {cards.slice(0, desiredItemCount).map((card) => (
        <Grid.Item css={itemStyle} key={card.id}>
          <CardContent {...card} {...{ itemWidth }} />
        </Grid.Item>
      ))}
    </Grid.Container>
  );
}
