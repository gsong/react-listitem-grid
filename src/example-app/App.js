//@flow strict
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

import * as constants from "./constants";
import Constants from "./contexts";
import FlexContainer from "./FlexContainer";
import GridContainer from "./GridContainer";

const App = () => {
  const { state, updateState } = useInit();

  return (
    <main css={{ "*": { boxSizing: "border-box", fontFamily: "sans-serif" } }}>
      <Form {...{ state, updateState }} />

      <Constants.Provider value={state}>
        <section>
          <h2>Max Item Width</h2>
          <FlexContainer />
          <GridContainer />
        </section>
        <hr />
        <section>
          <h2>Max Item Width (observe maxRows)</h2>
          <FlexContainer observeMaxRows />
          <GridContainer observeMaxRows />
        </section>
        <hr />
        <section>
          <h2>Max Items Per Row</h2>
          <FlexContainer maximizeItemsPerRow />
          <GridContainer maximizeItemsPerRow />
        </section>
        <hr />
        <section>
          <h2>Max Items Per Row (observe maxRows)</h2>
          <FlexContainer maximizeItemsPerRow observeMaxRows />
          <GridContainer maximizeItemsPerRow observeMaxRows />
        </section>
      </Constants.Provider>
    </main>
  );
};

const useInit = () => {
  const [state, updateState] = React.useReducer(
    (state, update) => ({ ...state, ...update }),
    constants,
  );

  return { state, updateState };
};

const Form = (props) => (
  <form css={gridForm}>
    <fieldset>
      <legend>Container</legend>
      <Field input="width" unit="%" {...props} />
      <Field input="border" {...props} />
      <Field input="padding" {...props} />
    </fieldset>
    <fieldset>
      <legend>Grid</legend>
      <Field input="itemCount" unit="" {...props} />
      <Field input="maxRows" unit="" {...props} />
      <Field input="columnGap" {...props} />
      <Field input="rowGap" {...props} />
      <Field input="minItemWidth" {...props} />
      <Field input="maxItemWidth" {...props} />
    </fieldset>
  </form>
);

const Field = ({ input, unit = "px", state, updateState, ...props }) => {
  const update = (event) => {
    const value = event.currentTarget.value;
    updateState({
      [(input: string)]: value === "" ? constants[input] : Number(value),
    });
  };

  return (
    <label
      css={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontSize: 15,
        "> *": { margin: ".2em" },
      }}
      {...props}
    >
      <div css={{ marginLeft: 0 }}>{input}:</div>
      <input
        type="number"
        pattern="[0-9]*"
        min={0}
        required
        defaultValue={state[input]}
        onChange={(event) => update(event)}
        css={{ width: "4em" }}
      />
      <div css={{ width: "1em" }}>{unit}</div>
    </label>
  );
};

const gridForm = {
  backgroundColor: "white",
  borderBottom: "1px solid lightGray",
  display: "flex",
  margin: "0 -8px 0 -8px",
  padding: ".5em",

  "@media (min-height: 500px)": {
    position: "sticky",
    top: 0,
  },
};

export default App;
