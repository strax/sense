import React from "react";
import { ExampleDefinition } from "./examples";

export interface AppContext {
  examples: ReadonlyArray<ExampleDefinition>;
}

export default React.createContext<AppContext>();
