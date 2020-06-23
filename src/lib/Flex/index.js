//@flow strict
import React from "react";

import { flexCompensate } from "../utils.js";

import type { Gaps, Props } from "../types.js";

const Container = React.forwardRef<Props, ?HTMLElement>(
  ({ columnGap, rowGap, children, ...props }, ref) => {
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

const Item = ({ columnGap, itemWidth, rowGap, ...props }: ItemProps) => {
  const style = {
    width: itemWidth,
    ...flexCompensate.item({ columnGap, rowGap }),
  };

  return <li data-react-listitem-flex-item style={style} {...(props: any)} />;
};

export default { Container, Item };
