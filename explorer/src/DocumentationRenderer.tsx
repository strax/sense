import React from "react";
import JsxPreview from "./JsxPreview";
import { Example, DocumentationNode } from "@sense/core";
import Markdown from "react-markdown";
import PropsList from "./PropsList";

const formatDocumentationNode = (node: DocumentationNode) => {
  switch (node.type) {
    case "MarkdownNode":
      return <Markdown source={node.content} />;
    case "PropsNode":
      return <PropsList component={node.component} />;
  }
};

const DocumentationRenderer: React.SFC<{ example: Example }> = props => (
  <>
    {props.example.description.map(formatDocumentationNode)}
    <JsxPreview example={props.example} />
  </>
);

export default DocumentationRenderer;
