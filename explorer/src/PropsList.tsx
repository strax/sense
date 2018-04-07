import React from "react";
import styled from "styled-components";

// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { duotoneDark } from "react-syntax-highlighter/styles/prism";
import componentMetadata from "./componentMetadata";
import Monospace from "./Monospace";

const PropsGrid = styled.div`
  display: grid;
  grid-template-columns: min-content auto 1fr;
  grid-column-gap: 15px;
  align-items: center;
`;

const Cell = styled.div`
  line-height: 2;
  font-size: 14px;
`;

const Header = Cell.extend`
  font-weight: 700;
  border-bottom: 2px solid #e47a64;
`;

const NoMetadataAvailable: React.SFC = props => (
  <span>No metadata available.</span>
);

const PropsList: React.SFC<{ component: React.ComponentType }> = ({
  component
}) => {
  const metadata = componentMetadata(component);

  if (!metadata) {
    return <NoMetadataAvailable />;
  } else {
    return (
      <PropsGrid>
        <Header>Property</Header>
        <Header>Type</Header>
        <Header>Description</Header>
        {metadata.props.map(prop => {
          return (
            <React.Fragment key={prop.key}>
              <Cell>
                <Monospace>{prop.key}</Monospace>
              </Cell>
              <Cell>
                <SyntaxHighlighter
                  language="typescript"
                  style={duotoneDark}
                  customStyle={{
                    padding: 0,
                    border: 0,
                    background: "none",
                    lineHeight: "inherit",
                    margin: 0,
                    fontFamily: "inherit"
                  }}
                  CodeTag={Monospace}
                  codeTagProps={{
                    style: {
                      background: "none",
                      fontFamily: '"SF Mono", "Menlo", "Consolas", monospace'
                    }
                  }}
                >
                  {prop.type}
                </SyntaxHighlighter>
              </Cell>
              <Cell>{prop.description}</Cell>
            </React.Fragment>
          );
        })}
      </PropsGrid>
    );
  }
};

export default PropsList;
