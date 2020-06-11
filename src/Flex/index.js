import React from "react";

import { flexCompensate } from "../utils";

const Container = React.forwardRef(
  ({ columnGap, rowGap, children, ...props }, ref) => {
    const style = flexCompensate.container({ columnGap, rowGap });

    return (
      <div {...props}>
        <ul data-supple-flex-container style={style} ref={ref}>
          {children}
        </ul>
      </div>
    );
  },
);

const Item = ({ itemWidth, columnGap, rowGap, ...props }) => {
  const style = flexCompensate.item({ itemWidth, columnGap, rowGap });

  return <li data-supple-flex-item style={style} {...props} />;
};

export default { Container, Item };
