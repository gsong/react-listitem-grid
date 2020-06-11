import React from "react";

const Container = React.forwardRef(
  ({ itemWidth, columnGap, rowGap, children, ...props }, ref) => (
    <div {...props}>
      <ul
        data-supple-grid-container
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

const Item = ({ ...props }) => <li data-supple-grid-item {...props} />;

export default { Container, Item };
