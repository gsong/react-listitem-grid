//@flow strict
/** @jsx jsx */
import { jsx } from "@emotion/core";

import Card from "./Card";
import { Grid } from "../lib";
import { useLayout } from "./hooks";

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
    adjustedItemWidth,
    cards,
    columnGap,
    containerRef,
    containerStyle,
    rowGap,
  } = useLayout({ maximizeItemsPerRow, observeMaxRows });

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
            itemWidth={adjustedItemWidth}
            {...card}
            key={card.id}
          />
        ))}
      </Grid.Container>
    </section>
  );
};

export default GridContainer;
