//@flow strict
import type { Node } from "react";

export type Gaps = { columnGap?: number, rowGap?: number };
export type Props = { ...Gaps, children: Node, ... };
