import React from "react";
import { injectGlobal } from "styled-components";
import ModuleMap from "ModuleMap";
import ComponentView from "./ComponentView";

injectGlobal`
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

:root {
  font-family: "Roboto", sans-serif;
}
`;

interface Props {
  modules: ModuleMap;
}

export default class App extends React.Component<Props> {
  render() {
    return (
      <div>
        {Array.from(this.props.modules.entries()).map(([name, example]) => (
          <ComponentView path={name} example={example} key={name} />
        ))}
      </div>
    );
  }
}
