import React from "react";
import styled from "styled-components";

const BlockHeader = styled.h3`
  font-size: 16px;
  user-select: none;
`;

const BlockContainer = styled.div`
  border: 1px solid #404046;
  padding: 0 15px;
  margin-bottom: 1rem;
  text-rendering: optimizeLegibility;
`;

interface Props {
  header?: string;
}

const Block: React.SFC<Props> = props => (
  <BlockContainer>
    {props.header && <BlockHeader>{props.header}</BlockHeader>}
    {props.children}
  </BlockContainer>
);

export default Block;
