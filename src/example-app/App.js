//@flow strict
/** @jsx jsx */
import * as React from "react";
import { Global, jsx } from "@emotion/core";

import "./server";

const examples: {
  [string]: {
    label: string,
    src?: string,
    Component?: () => Promise<{ default: React.ComponentType<any> }>,
  },
} = {
  FlexAll: { label: "Flex with all cards" },
  FlexMaxItems: { label: "Flex max items per row with all cards" },
  FlexMaxRows: { label: "Flex with maxRows constraints" },
  FlexMaxRowsMaxItems: {
    label: "Flex max items per row with maxRows constraints",
  },
  GridAll: { label: "Grid with all cards" },
  GridMaxItems: { label: "Grid max items per row with all cards" },
  GridMaxRows: { label: "Grid with maxRows constraints" },
  GridMaxRowsMaxItems: {
    label: "Grid max items per row with maxRows constraints",
  },
  GridMinimumSetup: { label: "Grid with minimum setup" },
  Playground: {
    label: "Library playground",
    src: "Playground/index.js",
    Component: () => import("./Playground/index.js"),
  },
};

const App = (): React.Node => {
  const [selected, setExample] = React.useState("FlexAll");
  const Example = React.lazy(
    examples[selected].Component ?? (() => import(`./examples/${selected}`)),
  );
  const src = examples[selected].src ?? `examples/${selected}.js`;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <main>
        <Global styles={globalStyle} />
        <nav css={{ marginBottom: "0.75em" }}>
          <label>
            Choose an example:
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              name="example"
              value={selected}
              onChange={(e) => setExample(e.currentTarget.value)}
            >
              {/* $FlowIgnore */}
              {Object.entries(examples).map(([value, { label }]) => (
                <option {...{ value }} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <a
            href={`https://github.com/gsong/react-listitem-grid/blob/develop/src/example-app/${src}`}
            css={{ marginLeft: "1em" }}
          >
            View source
          </a>
        </nav>
        <Example />
      </main>
    </React.Suspense>
  );
};

const globalStyle = {
  html: {
    boxSizing: "border-box",
    fontFamily: "sans-serif",
  },

  "*, *:before, *:after": {
    boxSizing: "inherit",
    fontFamily: "inherit",
  },
};

export default App;
