import React from "react";
import styled from "styled-components";
import {
  ComponentMetadata,
  PropMetadata
} from "@sense/webpack-ts-props-loader";

const PropsGrid = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
`;

const Header = styled.div`
  font-weight: 700;
`;

const Cell = styled.div``;

const NoMetadataAvailable: React.SFC = props => (
  <span>No metadata available.</span>
);

const Props: React.SFC<{ metadata: Array<PropMetadata> }> = props => {
  return (
    <>
      <PropsGrid>
        <Header>Property</Header>
        <Header>Type</Header>
        {props.metadata.map(prop => {
          return (
            <>
              <Cell>{prop.name}</Cell>
              <Cell>{prop.type}</Cell>
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
