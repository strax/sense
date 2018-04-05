import React from "react";
import Markdown from "react-markdown";
import { stripIndent } from "common-tags";
export function markdown(segments) {
    const joined = stripIndent(segments);
    return React.createElement(Markdown, { source: joined });
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
