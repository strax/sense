import React from "react";
import JsxPreview from "./JsxPreview";
import { Example } from "@sense/core";
import Markdown from "react-markdown";
import PropsTypeView from "./PropsTypeView";
import componentMetadata from "./componentMetadata";
import styled from "styled-components";
import { ComponentMetadata } from "@sense/webpack-ts-props-loader";
import stripIndent from "strip-indent";
import ExampleSourceBlock from "./ExampleSourceBlock";
import PropTypesBlock from "./PropTypesBlock";

const DocumentationRenderer: React.SFC<{ example: Example }> = props => (
  <>
    {props.example.description && <Markdown source={stripIndent(props.example.description)} />}
    <PropTypesBlock />
    <ExampleSourceBlock />
  </>
);

export default DocumentationRenderer;
