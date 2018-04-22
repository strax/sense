import React from "react";
import ExampleViewer from "./ExampleViewer";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import AppContext from "./AppContext";

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
        <AppContext.Consumer>
          {ctx => {
            // TODO: Take named exports into account
            const example = ctx!.examples.find(x => x.path === path)!;
            return <ExampleViewer example={example.example} path={path} />;
          }}
        </AppContext.Consumer>
      </Container>
    );
  }
}
