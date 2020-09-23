//@flow strict
/** @jsx jsx */
import * as React from "react";
import debounce from "lodash/debounce";
import { jsx } from "@emotion/core";

import * as constants from "./constants";
import Constants from "./contexts";
import FlexContainer from "./FlexContainer";
import GridContainer from "./GridContainer";

export default (): React.Node => {
  const { state, updateState } = useInit();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const useInit = () => {
  const [state, updateState] = React.useReducer(
    // $FlowFixMe
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
      <Field input="alignment" unit="" {...props}>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          defaultValue={props.state.alignment}
          onChange={(e) =>
            props.updateState({ alignment: e.currentTarget.value })
          }
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </Field>
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

const Field = ({
  input,
  unit = "px",
  state,
  updateState,
  children = undefined,
  ...props
}) => {
  const update = React.useCallback(
    debounce(
      (value) =>
        updateState({
          [(input: string)]: value === "" ? constants[input] : Number(value),
        }),
      500,
    ),
    [input, updateState],
  );

  return (
    <label
      css={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontSize: "inherit",
        "> *": { margin: ".2em" },
      }}
      {...props}
    >
      <div css={{ marginLeft: 0 }}>{input}:</div>
      <Input defaultValue={state[input]} update={update}>
        {children}
      </Input>
      <div css={{ width: "1em" }}>{unit}</div>
    </label>
  );
};

const Input = ({ defaultValue, update, children = undefined }) =>
  children ? (
    children
  ) : (
    <input
      type="number"
      pattern="[0-9]*"
      min={0}
      required
      onChange={(event) => update(event.currentTarget.value)}
      {...{ defaultValue }}
      css={{ width: "4em" }}
    />
  );

const gridForm = {
  backgroundColor: "white",
  borderBottom: "1px solid lightGray",
  display: "flex",
  margin: "0 -8px 0 -8px",
  padding: ".5em",
  fontSize: "clamp(12px, 3.5vw, 1rem)",

  "@media (min-height: 670px)": {
    position: "sticky",
    top: 0,
  },
};
