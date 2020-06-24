//@flow strict
/** @jsx jsx */
import React from "react";
import { Global, jsx } from "@emotion/core";

import "./server";
import FlexAll from "./examples/FlexAll";
import FlexMaxItems from "./examples/FlexMaxItems";
import FlexMaxRows from "./examples/FlexMaxRows";
import FlexMaxRowsMaxItems from "./examples/FlexMaxRowsMaxItems";
import GridAll from "./examples/GridAll";
import GridMaxItems from "./examples/GridMaxItems";
import GridMaxRows from "./examples/GridMaxRows";
import GridMaxRowsMaxItems from "./examples/GridMaxRowsMaxItems";
import GridMinimumSetup from "./examples/GridMinimumSetup";
import Playground from "./Playground";

const examples = {
  flex: {
    component: FlexAll,
    label: "Flex with all cards",
  },
  flexMaxItems: {
    component: FlexMaxItems,
    label: "Flex max items per row with all cards",
  },
  flexMaxRows: {
    component: FlexMaxRows,
    label: "Flex with maxRows constraints",
  },
  flexMaxRowsMaxItems: {
    component: FlexMaxRowsMaxItems,
    label: "Flex max items per row with maxRows constraints",
  },
  grid: {
    component: GridAll,
    label: "Grid with all cards",
  },
  gridMaxItems: {
    component: GridMaxItems,
    label: "Grid max items per row with all cards",
  },
  gridMaxRows: {
    component: GridMaxRows,
    label: "Grid with maxRows constraints",
  },
  gridMaxRowsMaxItems: {
    component: GridMaxRowsMaxItems,
    label: "Grid max items per row with maxRows constraints",
  },
  gridMinimumSetup: {
    component: GridMinimumSetup,
    label: "Grid with minimum setup",
  },
  playground: {
    component: Playground,
    label: "Library playground",
    src: "Playground/index.js",
  },
};

const App = () => {
  const [selected, setExample] = React.useState("grid");
  const Example = examples[selected].component;

  // $FlowFixMe
  const src = examples[selected].src ?? `examples/${Example.name}.js`;

  return (
    <React.Fragment>
      <main>
        <Global styles={globalStyle} />
        <nav>
          <label>
            Choose an example:
            <select
              name="example"
              value={selected}
              onChange={(e) => setExample(e.currentTarget.value)}
            >
              {/* $FlowFixMe */}
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
    </React.Fragment>
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
