import React from "react";
import { Example } from ".";

export interface HostContext {
  root: Node;
  example: Example;
}

export default React.createContext<HostContext>();
