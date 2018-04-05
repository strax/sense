import React from "react";
import ModuleContext from "./ModuleContext";
import { Link } from "react-router-dom";

const ModuleRow: React.SFC<{ src: string }> = props => (
  <li>
    <Link to={props.src}>{props.src}</Link>
  </li>
);

export default (props: void) => (
  <ModuleContext.Consumer>
    {modules =>
      modules && (
        <ul>
          {Array.from(modules.keys()).map(k => <ModuleRow key={k} src={k} />)}
        </ul>
      )
    }
  </ModuleContext.Consumer>
);
