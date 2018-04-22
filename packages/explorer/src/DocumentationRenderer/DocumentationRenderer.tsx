import React from "react";
import JsxPreview from "./JsxPreview";
import { Example } from "@sense/core";
import Markdown from "react-markdown";
import PropsTypeView from "./PropsTypeView";
import componentMetadata from "./componentMetadata";
import styled from "styled-components";
import { ComponentMetadata } from "@sense/webpack-ts-props-loader";
import stripIndent from "strip-indent";

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

type ReactTree = React.ReactElement<any> | React.ReactText;

const componentsFromTree = (root: ReactTree): Set<React.ComponentType> => {
  if (typeof root === "string" || typeof root === "number") {
    return new Set();
  } else {
    const subtree = React.Children.toArray(root.props.children)
      .reduce((acc, child ) => [...acc, ...componentsFromTree(child)], [root.type])
      .filter(type => typeof type !== "string") as React.ComponentType[];
    return new Set(subtree);
  }
}

const propTypes = (tree: React.ReactElement<any>) => {
  return Array.from(componentsFromTree(tree)).map(componentMetadata) as ComponentMetadata[];
}

const DocumentationRenderer: React.SFC<{ example: Example }> = props => (
  <>
    {props.example.description && <Markdown source={stripIndent(props.example.description)} />}
    {propTypes(props.example.render).map(meta => (
      <Section key={meta.name}>
        <SectionHeader>{meta.name}</SectionHeader>
        <PropsTypeView metadata={meta.props} />
      </Section>
    ))}
    <Section>
      <SectionHeader>Example source</SectionHeader>
      <JsxPreview tree={props.example.render} />
    </Section>
  </>
);

export default DocumentationRenderer;
