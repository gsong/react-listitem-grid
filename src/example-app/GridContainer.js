//@flow strict
/** @jsx jsx */
import React from "react";
import range from "lodash/range";
import { jsx } from "@emotion/core";

import Card, { generateCardProps } from "./Card";
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
  ({ itemWidth, columnGap, rowGap, containerStyle, containerRef, count }) => (
    <section>
      <h3>Grid ({itemWidth}px)</h3>
      <Grid.Container
        {...{ itemWidth, columnGap, rowGap }}
        css={containerStyle}
        ref={containerRef}
      >
        {range(count).map((i) => {
          const props = generateCardProps(i, itemWidth);
          return (
            <Card component={Grid.Item} {...props} width={itemWidth} key={i} />
          );
        })}
      </Grid.Container>
    </section>
  ),
);

export default GridContainer;
