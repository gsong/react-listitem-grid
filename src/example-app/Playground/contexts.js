//@flow strict
import React from "react";

import * as constants from "./constants";

const Constants: React$Context<{|
  +alignment: string,
  +border: number,
  +columnGap: number,
  +itemCount: number,
  +maxItemWidth: number,
  +maxRows: number,
  +minItemWidth: number,
  +padding: number,
  +rowGap: number,
  +width: number,
|}> = React.createContext<typeof constants>(constants);

export default Constants;
