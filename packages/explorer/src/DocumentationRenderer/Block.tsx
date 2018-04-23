import React from "react";
import styled from "styled-components";

const BlockHeader = styled.h3`
  font-size: 16px;
  user-select: none;
  cursor: pointer;
  margin: -1rem;
  padding: 1rem;
`;

const BlockContainer = styled.div`
  border: 1px solid #404046;
  padding: 1rem;
  margin-bottom: 1rem;
  text-rendering: optimizeLegibility;
  overflow: hidden;
  border-radius: 3px;
`;

const Caret = styled.div`
  float: right;
  transform-origin: 50% 50%;
  font-size: 32px;
  font-weight: normal;
  line-height: 16px;
  transform: rotate(
    ${(props: { open: boolean }) => (props.open ? "90deg" : "0")}
  );
  transition: 90ms ease-in transform;
`;

const BlockContent = styled.div`
  margin-top: 1rem;
  overflow-x: auto;
`;

interface Props {
  header?: string;
}

interface State {
  open: boolean;
}

export default class Block extends React.Component<Props, State> {
  state: State = {
    open: false
  };

  private toggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    return (
      <BlockContainer>
        {this.props.header && (
          <BlockHeader onClick={this.toggle}>
            {this.props.header}
            <Caret open={this.state.open}>›</Caret>
          </BlockHeader>
        )}
        {this.state.open && <BlockContent>{this.props.children}</BlockContent>}
      </BlockContainer>
    );
  }
}
