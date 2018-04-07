import React from "react";

export interface HostContext {
  root: Element;
}

// @ts-ignore
export default React.createContext(root);
