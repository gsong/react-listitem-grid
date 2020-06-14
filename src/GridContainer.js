//@flow strict
/** @jsx jsx */
import range from "lodash/range";
import { jsx } from "@emotion/core";

import { Grid } from "./lib";
import { useLayout } from "./hooks";

import "./lib/Grid/styles.css";

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
    <section>
      <h3>Grid ({itemWidth}px)</h3>
      <Grid.Container
        {...{ itemWidth, columnGap, rowGap }}
        css={containerStyle}
        ref={containerRef}
      >
        {range(count).map((i) => (
          <Grid.Item
            css={{
              backgroundColor: maximizeItemsPerRow ? "blue" : "orange",
              color: "white",
            }}
            key={i}
          >
            Hi
          </Grid.Item>
        ))}
      </Grid.Container>
    </section>
  );
};

export default GridContainer;
