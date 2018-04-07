import React from "react";
import styled from "styled-components";
import {
  ComponentMetadata,
  PropMetadata
} from "@sense/webpack-ts-props-loader";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { ghcolors } from "react-syntax-highlighter/styles/prism";

const PropsGrid = styled.div`
  display: grid;
  grid-template-columns: min-content auto 1fr;
  grid-column-gap: 15px;
  align-items: center;
`;

const Cell = styled.div`
  line-height: 2;
`;

const Header = Cell.extend`
  font-weight: 700;
  border-bottom: 2px solid #e47a64;
`;

const NoMetadataAvailable: React.SFC = props => (
  <span>No metadata available.</span>
);

const Props: React.SFC<{ metadata: Array<PropMetadata> }> = props => {
  return (
    <>
      <PropsGrid>
        <Header>Property</Header>
        <Header>Type</Header>
        <Header>Description</Header>
        {props.metadata.map(prop => {
          return (
            <>
              <Cell>{prop.key}</Cell>
              <Cell>
                <SyntaxHighlighter
                  language="typescript"
                  useInlineStyles
                  style={ghcolors}
                  customStyle={{
                    padding: 0,
                    border: 0
                  }}
                >
                  {prop.type}
                </SyntaxHighlighter>
              </Cell>
              <Cell>{prop.description}</Cell>
            </>
          );
        })}
      </PropsGrid>
    </>
  );
};

export default function props(component: React.ComponentType<any>) {
  const metadata = component[Symbol.for("react/metadata")] as
    | ComponentMetadata
    | undefined;
  if (!metadata) {
    return <NoMetadataAvailable />;
  } else {
    return <Props metadata={metadata.props} />;
  }
}
