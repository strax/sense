import React from "react";
import ReactDOM from "react-dom";

const COMPONENT_NAME_RE = /\/__examples__\/(.+)\.example\.(?:.+)$/;

interface Props {
  path: string;
  render: () => JSX.Element;
}

export default class ComponentView extends React.Component<Props> {
  private mountNode!: HTMLElement;

  componentDidMount() {
    this.renderInNewInstance();
  }

  componentDidUpdate() {
    this.renderInNewInstance();
  }

  renderInNewInstance() {
    ReactDOM.render(this.props.render(), this.mountNode);
  }

  render() {
    return (
      <>
        <h3>{this.props.path.match(COMPONENT_NAME_RE)![1]}</h3>
        <div ref={node => node && (this.mountNode = node)} />
      </>
    );
  }
}
