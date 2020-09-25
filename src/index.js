//@flow strict
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";

import App from "./example-app/App";

const rootElement = document.getElementById("root");
rootElement &&
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement,
  );
