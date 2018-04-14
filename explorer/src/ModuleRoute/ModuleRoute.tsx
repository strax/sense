import React from "react";
import ModuleContext from "../ModuleContext";
import { RouteComponentProps } from "react-router";
import ExampleRenderer from "./ExampleRenderer";
import styled from "styled-components";
import ModuleHeader from "./ModuleHeader";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
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
            return (
              <>
                <ModuleHeader path={path} />
                {Object.entries(modules!.get(path)!).map(([name, example]) => (
                  <ExampleRenderer key={name} example={example} path={path} />
                ))}
              </>
            );
          }}
        </ModuleContext.Consumer>
      </Container>
    );
  }
}
