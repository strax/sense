import React from "react";
import Markdown from "react-markdown";
import styled from "styled-components";
import { flatten, zip } from "ramda";
export { default as props } from "./props";
export function doc(segments, ...interpolations) {
    return (React.createElement(React.Fragment, null, flatten(zip(segments.map((segment, i) => (React.createElement(Markdown, { source: segment.trimLeft(), key: i }))), interpolations))));
}
const VariantsContainer = styled.div `
  width: 100%;
  min-height: 100%;
  display: grid;
`;
export class Variants extends React.Component {
    render() {
        return (React.createElement(VariantsContainer, null, React.Children.map(this.props.children, child => React.createElement("div", null, child))));
    }
}
export class Example extends React.Component {
    get component() {
        return this.props.component;
    }
    get description() {
        return this.props.description;
    }
    get view() {
        return this.props.children;
    }
    render() {
        return this.props.children;
    }
}
