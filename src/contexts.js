//@flow strict
import React from "react";

import * as constants from "./constants";

const Constants = React.createContext<typeof constants>(constants);

export default Constants;
