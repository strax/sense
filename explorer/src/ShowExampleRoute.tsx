import React from "react";
import ModuleContext from "./ModuleContext";
import ExampleViewer from "./ExampleViewer";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default class ModuleRoute extends React.Component<
  RouteComponentProps<[string]>
> {
  render() {
    const path = this.props.match.params[0];
    return (
      <Container>
        <ModuleContext.Consumer>
          {modules => {
            // TODO: Take named exports into account
            const example = modules!.get(path)!.default;
            return <ExampleViewer example={example} path={path} />;
          }}
        </ModuleContext.Consumer>
      </Container>
    );
  }
}
