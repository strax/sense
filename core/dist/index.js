import React from "react";
import Markdown from "react-markdown";
import { stripIndent } from "common-tags";
import styled from "styled-components";
export function markdown(segments) {
    const joined = stripIndent(segments);
    return React.createElement(Markdown, { source: joined });
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
