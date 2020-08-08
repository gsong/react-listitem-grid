# Change Log

All notable changes to this project are documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.2](https://github.com/gsong/react-listitem-grid/compare/v2.2.1...v2.2.2) (2020-08-08)

### Bug Fixes

- cjs instead of es package output
  ([b27c393](https://github.com/gsong/react-listitem-grid/commit/b27c393199dd9d99be6246bc673e4dd10fbba555))
- ignore flow error with ReactDOM.render
  ([9ffaf01](https://github.com/gsong/react-listitem-grid/commit/9ffaf01e31f3c6e5e5f5aeb5a0fd07bc94ac92c0))

## 2.2.1 (2020-06-28)

- Auto release via CI
- Add tests

## 2.2.0 (2020-06-26)

- Make `minItemWidth` param optional with default value of 0.

## 2.1.0 (2020-06-24)

- Make `columnGap` and `rowGap` params optional with default value of 0,
  wherever they're needed.

## 2.0.2 (2020-06-23)

- Observe and unobserve container with each render cycle. This is to address an
  issue in IE where the containerRef isn't attached to the DOM element fast
  enough.
- Return `undefined` for `desiredItemCount` instead of `null` if there's no way
  to calculate the value.
- Attach CSS `width` directly to each flex item.

## 2.0.1 (2020-06-22)

- Use `ResizeObserver` in place of `@reach/rect` to observe container size
  changes. This has the benefit of simplifying the usage of the library, since
  we ensure that `useCalculateLayout` updates state only when the container
  width changes.

### Backward Incompatible Changes

- `flexCompensate.item()` no longer accepts `itemWidth` as a param, since we
  don't use `flex-basis` style anymore on flex items. As a result, the only CSS
  attribute returned is `margin`.
- `Flex.Item` component no longer accepts `itemWidth` prop.

## 1.0.0 (2020-06-21)

- Update styling data attribute names
- Add `calculateItemWidthWithCount` to adjust the item width once the number of
  items is known.

### Backward Incompatible Changes

- Rename `calculateItemWidth` to `calculateLayoutSpec`
- `calculateLayoutSpec` and `useCalculateLayout` no longer accept `itemCount` as
  a param.

## 0.0.3 (2020-06-15)

- No feature changes, just using more compatible Babel settings to compile dist

## 0.0.2 (2020-06-11)

- Add flow typing

## 0.0.1 (2020-06-11)

- Initial release
