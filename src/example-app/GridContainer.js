//@flow strict
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

import Card from "./Card";
import { Grid } from "../lib";
import { useGetCards, useLayout } from "./hooks";

import "../lib/Grid/styles.css";

type Props = {
  maximizeItemsPerRow?: boolean,
  observeMaxRows?: boolean,
};

const GridContainer = ({
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
  } = useLayout({ maximizeItemsPerRow });

  const count = observeMaxRows ? itemRenderCount : itemCount;

  return (
    <Content
      {...{ itemWidth, columnGap, rowGap, containerStyle, containerRef, count }}
    />
  );
};

// $FlowFixMe
const Content = React.memo(
  ({ itemWidth, columnGap, rowGap, containerStyle, containerRef, count }) => {
    const cards = useGetCards(count);

    return (
      <section>
        <h3>Grid ({itemWidth}px)</h3>
        <Grid.Container
          {...{ itemWidth, columnGap, rowGap }}
          css={containerStyle}
          ref={containerRef}
        >
          {cards.map((card) => (
            <Card
              component={Grid.Item}
              width={itemWidth}
              {...card}
              key={card.id}
            />
          ))}
        </Grid.Container>
      </section>
    );
  },
);

export default GridContainer;
