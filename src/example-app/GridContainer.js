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
  const layoutInfo = useLayout({ maximizeItemsPerRow, observeMaxRows });

  return <Content {...layoutInfo} {...{ observeMaxRows }} />;
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

    return (
      <section>
        <h3>Grid ({adjustedItemWidth}px)</h3>
        <Grid.Container
          {...{ columnGap, rowGap }}
          itemWidth={adjustedItemWidth}
          css={containerStyle}
          ref={containerRef}
        >
          {cards.map((card) => (
            <Card
              component={Grid.Item}
              width={adjustedItemWidth}
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
