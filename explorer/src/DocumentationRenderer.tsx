import React from "react";
import JsxPreview from "./JsxPreview";
import { Example, DocumentationNode } from "@sense/core";
import Markdown from "react-markdown";
import PropsTypeView from "./PropsTypeView";
import componentMetadata from "./componentMetadata";
import styled from "styled-components";

const SectionHeader = styled.h3`
  font-size: 16px;
  user-select: none;
`;

const Section = styled.div`
  border: 1px solid #404046;
  padding: 0 15px;
  margin-bottom: 1rem;
  text-rendering: optimizeLegibility;
`;

const formatDocumentationNode = (node: DocumentationNode, i: number) => {
  switch (node.type) {
    case "MarkdownNode":
      return <Markdown source={node.content} key={i} />;
    case "PropsNode":
      const metadata = componentMetadata(node.component);
      if (metadata) {
        return (
          <Section key={i}>
            <SectionHeader>{metadata.name} props</SectionHeader>
            <PropsTypeView metadata={metadata.props} />
          </Section>
        );
      } else {
        return <span>Type information not available</span>;
      }
  }
};

const DocumentationRenderer: React.SFC<{ example: Example }> = props => (
  <>
    {props.example.description.map(formatDocumentationNode)}
    <Section>
      <SectionHeader>Example source</SectionHeader>
      <JsxPreview example={props.example} />
    </Section>
  </>
);

export default DocumentationRenderer;
