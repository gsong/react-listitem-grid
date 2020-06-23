//@flow strict
/** @jsx jsx */
import { Grid } from "react-listitem-grid";
import { jsx } from "@emotion/core";

import CardContent from "../components/CardContent";
import { itemStyle } from "../styles";
import { useLayout } from "./hooks";

import "react-listitem-grid/Grid/styles.css";

type Props = {
  maximizeItemsPerRow?: boolean,
  observeMaxRows?: boolean,
};

const GridContainer = ({
  maximizeItemsPerRow = false,
  observeMaxRows = false,
}: Props) => {
  const {
    adjustedItemWidth: itemWidth,
    cards,
    columnGap,
    containerRef,
    containerStyle,
    rowGap,
  } = useLayout({ maximizeItemsPerRow, observeMaxRows });

  return (
    <section>
      <h3>Grid ({itemWidth}px)</h3>
      <Grid.Container
        {...{ columnGap, itemWidth, rowGap }}
        css={containerStyle}
        ref={containerRef}
      >
        {cards.map((card) => (
          <Grid.Item css={itemStyle} key={card.id}>
            <CardContent {...card} {...{ itemWidth }} />
          </Grid.Item>
        ))}
      </Grid.Container>
    </section>
  );
};

export default GridContainer;
