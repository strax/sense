import React from "react";
import { injectGlobal } from "styled-components";
import ModuleMap from "./ModuleMap";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./styles";
import ModuleContext from "./ModuleContext";
import IndexRoute from "./IndexRoute";
import ShowExampleRoute from "./ShowExampleRoute";

interface Props {
  modules: ModuleMap;
}

export default class App extends React.Component<Props> {
  componentDidMount() {
    injectGlobal`${styles}`;
  }

  render() {
    return (
      <ModuleContext.Provider value={this.props.modules}>
        <Router>
          <Switch>
            <Route exact path="/" component={IndexRoute} />
            <Route path="/(.*)" component={ShowExampleRoute} />
          </Switch>
        </Router>
      </ModuleContext.Provider>
    );
  }
}
