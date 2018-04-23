import React from "react";
import ReactDOM from "react-dom";
import { Example, IHostContext, HostContext } from "@sense/core";
import styled, { StyleSheetManager } from "styled-components";
import DocumentationRenderer from "../DocumentationRenderer";
import ErrorBoundary from "./ErrorBoundary";
import ModuleHeader from "./ModuleHeader";

interface Props {
  path: string;
  example: Example;
}

const SplitView = styled.div`
  margin-top: 50px;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr auto;
`;

const RightPane = styled.div`
  height: 100%;
  background: #21212b;
  color: #fefefe;
  -webkit-font-smoothing: antialiased;
  padding: 0 1rem;
  overflow: hidden;
`;

const ComponentContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #fff calc(10px - 2px), transparent 1%)
      center,
    linear-gradient(#fff calc(10px - 2px), transparent 1%) center,
    #ddd;
  background-size: 10px 10px;
`;

export default class ExampleViewer extends React.Component<Props> {
  private mountNode!: HTMLElement;

  componentDidMount() {
    this.mountNode.attachShadow({ mode: "open" });
    this.renderInNewInstance();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.example !== prevProps.example) {
      this.renderInNewInstance();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  private dispose() {
    ReactDOM.unmountComponentAtNode(this.mountNode);
  }

  private makeHostContext(): IHostContext {
    return {
      root: this.mountNode && this.mountNode.shadowRoot!,
      example: this.props.example
    };
  }

  private renderInNewInstance() {
    ReactDOM.render(
      <HostContext.Provider value={this.makeHostContext()}>
        <StyleSheetManager target={this.mountNode.shadowRoot!}>
          <ErrorBoundary>{this.props.example.render}</ErrorBoundary>
        </StyleSheetManager>
      </HostContext.Provider>,
      this.mountNode.shadowRoot! as any
    );
  }

  render() {
    return (
      <>
        <ModuleHeader path={this.props.path} />
        <SplitView>
          <div>
            <ComponentContainer
              innerRef={node => node && (this.mountNode = node)}
            />
          </div>
          <div>
            <RightPane>
              <HostContext.Provider value={this.makeHostContext()}>
                <DocumentationRenderer example={this.props.example} />
              </HostContext.Provider>
            </RightPane>
          </div>
        </SplitView>
      </>
    );
  }
}
