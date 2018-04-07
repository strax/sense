import React from "react";
import ReactDOM from "react-dom";
import { Example } from "@sense/core";
import { ExampleElement } from "ModuleMap";
import styled from "styled-components";
import JsxPreview from "./JsxPreview";
import transparent from "./transparent.svg";
import { Panel } from "rebass";

const COMPONENT_NAME_RE = /\/__examples__\/(.+)\.example\.(?:.+)$/;

interface Props {
  path: string;
  example: ExampleElement;
}

const ExampleMeta: React.SFC<{ example: Example }> = props => (
  <div>
    {props.example.description}
    {props.example.component && <>Component: {props.example.component.name}</>}
    <JsxPreview example={props.example} />
  </div>
);

const SplitView = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 2fr 1fr;
`;

const RightPane = styled.div`
  height: 100%;
  border-left: 1px solid #647177;
  padding: 1em;
`;

const ComponentContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #fff calc(10px - 2px), transparent 1%)
      center,
    linear-gradient(#fff calc(10px - 2px), transparent 1%) center,
    rgba(0, 0, 0, 0.075);
  background-size: 10px 10px;
`;

interface State {
  instance?: Example;
}

export default class ExampleRenderer extends React.Component<Props, State> {
  private mountNode!: HTMLElement;

  public state: State = {};

  componentDidMount() {
    this.mountNode.attachShadow({ mode: "open" });
    this.renderInNewInstance();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.example !== prevProps.example) {
      this.renderInNewInstance();
    }
  }

  renderInNewInstance() {
    const subtree = React.cloneElement(this.props.example as any, {
      ref: (instance: Example) => this.setState({ instance })
    });
    ReactDOM.render(subtree, this.mountNode.shadowRoot! as any);
  }

  render() {
    return (
      <SplitView>
        <div>
          <ComponentContainer
            innerRef={node => node && (this.mountNode = node)}
          />
        </div>
        {this.state.instance && (
          <div>
            <RightPane>
              <ExampleMeta example={this.state.instance} />
            </RightPane>
          </div>
        )}
      </SplitView>
    );
  }
}
