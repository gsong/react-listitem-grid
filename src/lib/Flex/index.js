//@flow strict
import * as React from "react";

import defaults from "../defaults.js";
import { flexCompensate } from "../utils/index.js";

import type { Gaps, Props } from "../types.js";

const Container: React$AbstractComponent<
  Props,
  ?HTMLElement,
> = React.forwardRef<Props, ?HTMLElement>(
  (
    {
      columnGap = defaults.columnGap,
      rowGap = defaults.rowGap,
      children,
      ...props
    },
    ref,
  ) => {
    const style = flexCompensate.container({ columnGap, rowGap });

    return (
      <div {...props}>
        <ul data-react-listitem-flex-container style={style} ref={ref}>
          {children}
        </ul>
      </div>
    );
  },
);

type ItemProps = { ...Gaps, itemWidth: number, ... };

const Item = ({
  columnGap = defaults.columnGap,
  itemWidth,
  rowGap = defaults.rowGap,
  ...props
}: ItemProps): React.Element<"li"> => {
  const style = {
    width: itemWidth,
    ...flexCompensate.item({ columnGap, rowGap }),
  };

  return <li data-react-listitem-flex-item style={style} {...(props: any)} />;
};

export default { Container, Item };
