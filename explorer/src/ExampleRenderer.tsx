import React from "react";
import ReactDOM from "react-dom";
import { Example } from "@sense/core";
import { ExampleElement } from "ModuleMap";
import styled from "styled-components";
import JsxPreview from "./JsxPreview";
import transparent from "./transparent.svg";

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

const ComponentContainer = styled.div`
  border: 1px solid #dedede;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('${transparent}');
  background-size: 20px 20px;
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
      <>
        {this.state.instance && <ExampleMeta example={this.state.instance} />}
        <ComponentContainer
          innerRef={node => node && (this.mountNode = node)}
        />
      </>
    );
  }
}
