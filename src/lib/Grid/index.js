//@flow strict
import * as React from "react";

import defaults from "../defaults.js";

import type { Props as Props_ } from "../types.js";

type Props = { ...Props_, itemWidth: number };

const Container: React$AbstractComponent<
  Props,
  ?HTMLElement,
> = React.forwardRef<Props, ?HTMLElement>(
  (
    {
      itemWidth,
      columnGap = defaults.columnGap,
      rowGap = defaults.rowGap,
      children,
      ...props
    },
    ref,
  ) => (
    <div {...props}>
      <ul
        data-react-listitem-grid-container
        style={{
          "--columnWidth": itemWidth,
          "--columnGap": columnGap,
          "--rowGap": rowGap,
        }}
        ref={ref}
      >
        {children}
      </ul>
    </div>
  ),
);

const Item = (props: any): React.Element<"li"> => (
  <li data-react-listitem-grid-item {...props} />
);

export default { Container, Item };
