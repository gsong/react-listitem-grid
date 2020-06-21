# react-listitem-grid

Utilities and components for responsive grid layout of list items.

- [Should I Use This Library?](#should-i-use-this-library)
  - [List Item Width](#list-item-width)
  - [List Item Alignment](#list-item-alignment)
  - [Items Per Row](#items-per-row)
  - [Maximum Number of Rows](#maximum-number-of-rows)
- [What's in This Library?](#whats-in-this-library)
  - [Utils](#utils)
  - [`useCalculateLayout` Hook](#usecalculatelayout-hook)
  - [React Components](#react-components)
- [Example App](#example-app)
- [Want to Help?](#want-to-help)

## Should I Use This Library?

This library currently satisfies some very narrow use cases.

### List Item Width

#### ✅ Use This Library

Your list item has a width range constraint. A good example is a result card
design that works well with a minimum width of 150px and a maximum width of
350px.

#### 🚫 Don't Use This Library

- Your list item has a fixed width.
- Your list item _only_ has minimum width, but can freely grow to any size.

There are much simpler ways (CSS-only if you're using grid) to solve the
problem.

### List Item Alignment

#### ✅ Use This Library

Your list items must always left-align within the grid.

#### 🚫 Don't Use This Library

If your list items need to do anything else.

### Items Per Row

#### ✅ Use This Library

You want to maximize either by item width or by number of items per row.

#### 🚫 Don't Use This Library

If you just need to maximize by number of items. There are simpler solutions.

### Maximum Number of Rows

#### ✅ Use This Library

You need to know how many items the grid container will be rendering, based on
the optionally specified maximum number of rows. This is useful, for example, to
know how many records to request from the back-end API.

## What's in This Library?

### Utils

There are two JavaScript utilities which can be used in any project.

- `calculateLayoutSpec()` does all the calculations and returns and object with:
  - `containerWidth`: _only_ useful for flexbox-based layout, where the actual
    container size is larger than what appears visually in order to accommodate
    column gaps.
  - `itemWidth`: The exact pixel width of each list item.
  - `desiredItemCount`: How many items should be rendered if the `maxRows`
    constraint is given. This value is `null` if `maxRows` is `0` or
    `undefined`.
- `flexCompensate`
  - `flexCompensate.container()` which returns the `margin` and `width` CSS
    values to be applied to the flex container.
  - `flexCompensate.item()` which returns the `flexBasis` and `margin` CSS
    values to be applied to the flex item.

### `useCalculateLayout` Hook

A convenience hook which uses [@reach/rect][] to measure the width of the grid
container. It returns all the values from `utils.calculateLayoutSpec()` plus a
`containerRef`, which you attach as a `ref` to a grid container in your JSX.
E.g.:

```js
import { useCalculateLayout } from "react-listitem-grid";

function MyComponent() {
  const { containerRef, ...calculatedValues } = useCalculateLayout(calParams);
  return <ul ref={containerRef}>...</ul>;
}
```

This will ensure `calculatedValues` is updated if `<ul>` is resized.

You don't need to use this hook if you want to handle things differently, in
that case, just use `calculateLayoutSpec()` directly.

### React Components

These components are supplied simply as styling conveniences, you don't have to
use them. These components do not use the `useCalculateLayout` hook, so it's up
to you to wire things up. Refer to the source code or the example app to see
what props are required.

Each compound component has `Container` and `Item`. `Container` is marked up as
`<ul>` and `Item` is marked up as `<li>`.

Each component also comes with its own CSS which must be imported if you want
the default layout behavior.

Example:

```js
import { Grid, useCalculateLayout } from "react-listitem-grid";

import "react-listitem-grid/Grid/styles.css";

function MyComponent() {
  const { containerRef, itemWidth } = useCalculateLayout(calParams);

  return (
    <Grid.Container itemWidth={itemWidth} columnGap={16} rowGap={16}>
      {items.map((item) => (
        <Grid.Item key={item.id}>{item.name}</Grid.Item>
      ))}
    </Grid.Container>
  );
}
```

The components should be flexible enough that you can apply additional styling
however you want: regular CSS, CSS modules, CSS-with-JS.

#### Grid

If you work with modern browsers that support CSS grid.

#### Flex

If you need to support older browsers with iffy or no grid support, e.g.
Internet Explorer.

## Example App

This repo contains an example app, which shows the effects of making adjustments
`calculateLayoutSpec()`'s params. You can clone this repo and run it locally:

```sh
npx pnpm i
npm start
```

You can also [see the app running at CodeSandbox][codesandbox].

The following files specifically use this library:

- [hooks.js][] shows how to instantiate the `useCalculateLayout` hook to get the
  raw calculated values for you to work with directly.
- [FlexContainer.js][] shows how to use CSS flexbox based `<ul>` container and
  `<li>` item components.
- [GridContainer.js][] shows how to use CSS grid based `<ul>` and `<li>`
  components.

## Want to Help?

[Check out the task board](https://github.com/gsong/react-listitem-grid/projects/1).

[@reach/rect]: https://reacttraining.com/reach-ui/rect
[codesandbox]: https://ejj94.codesandbox.io/
[flexcontainer.js]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/FlexContainer.js#L63-L80
[gridcontainer.js]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/GridContainer.js#L46-L57
[hooks.js]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/hooks.js#L12
