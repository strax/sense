import React from "react";
import { injectGlobal } from "styled-components";
import ModuleMap from "./ModuleMap";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./styles";
import AppContext from "./AppContext";
import IndexRoute from "./IndexRoute";
import ShowExampleRoute from "./ShowExampleRoute";
import { ExampleDefinition } from "./examples";

interface Props {
  examples: ExampleDefinition[];
}

export default class App extends React.Component<Props> {
  componentDidMount() {
    injectGlobal`${styles}`;
  }

  render() {
    return (
      <AppContext.Provider value={{ examples: this.props.examples }}>
        <Router>
          <Switch>
            <Route exact path="/" component={IndexRoute} />
            <Route path="/(.*)" component={ShowExampleRoute} />
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  }
}
