# react-listitem-grid

Utilities and components for responsive grid layout of list items. [See example
use cases][deployed].

## Table of Contents

- [Installation](#installation)
- [Should I Use This Library?](#should-i-use-this-library)
  - [List Item Width](#list-item-width)
  - [List Item Alignment](#list-item-alignment)
  - [Items Per Row](#items-per-row)
  - [Maximum Number of Rows](#maximum-number-of-rows)
- [What's in This Library?](#whats-in-this-library)
  - [Utils](#utils)
  - [`useCalculateLayout` Hook](#usecalculatelayout-hook)
  - [React Components](#react-components)
- [How Do I Use This Library?](#how-do-i-use-this-library)
  - [Example App](#example-app)
  - [Typical Workflow](#typical-workflow)
- [Want to Help?](#want-to-help)
- [Contributors](#contributors)
- [License](#license)

## Installation

```sh
npm install react-listitem-grid
```

This library has minimal peer depencency on `@babel/runtime`, which is probably
already present in your React project.

If you use the React hook and the components from this library, you'll also need
the `react` peer dependency.

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

There are some JavaScript utilities which can be used in any project.

#### `calculateLayoutSpec()`

[View source][calc-layout].

This function does all the calculations and returns an object with:

- `itemWidth`: The exact pixel width of each list item.
- `rowCount`: Number of items per row.
- `desiredItemCount`: How many items should be rendered if the `maxRows`
  constraint is given. This value is `undefined` if `maxRows` is `0` or
  `undefined`.
- `containerWidth`: _only_ useful for flexbox-based layout, where the actual
  container size is larger than what appears visually in order to accommodate
  column gaps.

⚠️ If you decide to use CSS flexbox to render the grid, be sure to pass
`isFlex: true`.

#### `calculateItemWidthWithCount()`

[View source][calc-itemwidth].

This is used to recalculate the `itemWidth` once the number of results are
known. For example, the container width may be able to fit 5 items across at
300px each. However, there are only 4 items to be displayed, we'll want to
display them at their maximum width of 350px instead of at 300px.

#### `flexCompensate`

[View source][flex-compensate].

- `flexCompensate.container()` which returns the CSS `margin` and `width` values
  to be applied to the flex container.
- `flexCompensate.item()` which returns the CSS `margin` value to be applied to
  the flex item.

### `useCalculateLayout` Hook

[View source][hook-source].

A convenience hook which uses [ResizeObserver][] to measure the width of the
grid container. It returns all the values from `utils.calculateLayoutSpec()`
plus a `containerRef`, which you attach as a `ref` to a grid container in your
JSX. E.g.:

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

ℹ️ For browsers that do not support ResizeObserver, the library will
[automatically ponyfill with `@juggle/resize-observer`][resizeobserver-ponyfill]
via dynamic import.

⚠️ If you decide to use CSS flexbox to render the grid, be sure to pass
`isFlex: true`.

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

[View source][grid].

If you work with modern browsers that support CSS grid.

#### Flex

[View source][flex].

If you need to support older browsers with iffy or no grid support, e.g.
Internet Explorer. This has been tested to work with IE 11.

## How Do I Use This Library?

### Example App

This repo [contains an example app][example app], which shows the effects of
making adjustments `calculateLayoutSpec()`'s params. You can clone this repo and
run it locally:

```sh
npm run init-dev
npm start
```

You can also [play with the deployed example app][deployed].

### Typical Workflow

The example app demonstrates a typical workflow of how to use this library.

1. Get the calculated values based on container width. The easiest way is to
   [use `useCalculateLayout`][calc-layout-usage] by [supplying some initial
   layout specs][layout-specs].

1. [Fetch the data you need for the list items][fetch-data].

1. [Recalculate the item width][recalc-width] if needed. This is necessary if
   the total number of items is less then `rowCount` (number of items per row).

1. Use the [Grid][grid-example] or [Flex][flex-example] components to render out
   the result.

The following files specifically use this library:

## Want to Help?

[Check out the task board][task-board] and [how to contribute][contributing].

[calc-itemwidth]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/lib/utils.js#L69-L81
[calc-layout-usage]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/examples/GridAll.js#L23-L28
[calc-layout]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/lib/utils.js#L6-L30
[contributing]:
  https://github.com/gsong/react-listitem-grid/blob/develop/CONTRIBUTING.md
[deployed]: https://gsong.github.io/react-listitem-grid/
[example app]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app
[fetch-data]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/examples/GridAll.js#L31-L35
[flex-compensate]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/lib/utils.js#L103-L120
[flex-example]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/examples/FlexAll.js#L47-L61
[flex]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/lib/Flex/index.js
[grid-example]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/examples/GridAll.js#L46-L56
[grid]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/lib/Grid/index.js
[hook-source]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/lib/hooks.js#L6-L8
[layout-specs]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/examples/GridAll.js#L16-L20
[recalc-width]:
  https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/examples/GridAll.js#L37-L43
[resizeobserver-ponyfill]: https://github.com/juggle/resize-observer
[resizeobserver]:
  https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
[task-board]: https://github.com/gsong/react-listitem-grid/projects/1

## Contributors

Thanks goes to these people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/gsong"><img src="https://avatars1.githubusercontent.com/u/607420?v=4" width="100px;" alt=""/><br /><sub><b>George Song</b></sub></a><br /><a href="https://github.com/gsong/react-listitem-grid/commits?author=gsong" title="Code">💻</a> <a href="https://github.com/gsong/react-listitem-grid/commits?author=gsong" title="Documentation">📖</a> <a href="#example-gsong" title="Examples">💡</a> <a href="#ideas-gsong" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-gsong" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-gsong" title="Maintenance">🚧</a> <a href="https://github.com/gsong/react-listitem-grid/pulls?q=is%3Apr+reviewed-by%3Agsong" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/hsw107"><img src="https://avatars2.githubusercontent.com/u/2524299?v=4" width="100px;" alt=""/><br /><sub><b>Hanna</b></sub></a><br /><a href="https://github.com/gsong/react-listitem-grid/commits?author=hsw107" title="Code">💻</a> <a href="https://github.com/gsong/react-listitem-grid/commits?author=hsw107" title="Documentation">📖</a> <a href="#example-hsw107" title="Examples">💡</a> <a href="#ideas-hsw107" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

[MIT](https://github.com/gsong/react-listitem-grid/blob/develop/LICENSE)
