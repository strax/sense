import React from "react";

export interface HostContext {
  root: Node;
}

export default React.createContext<HostContext>();
