import React from "react";
import Markdown from "react-markdown";
import { stripIndent } from "common-tags";
import styled from "styled-components";

export interface Props {
  component?: React.ComponentType;
  description?: string | React.ReactElement<any>;
}

export function markdown(segments: TemplateStringsArray) {
  const joined = stripIndent(segments);
  return <Markdown source={joined} />;
}

const VariantsContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: grid;
`;

export class Variants extends React.Component {
  render() {
    return (
      <VariantsContainer>
        {React.Children.map(this.props.children, child => <div>{child}</div>)}
      </VariantsContainer>
    );
  }
}

export class Example extends React.Component<Props> {
  public get component() {
    return this.props.component;
  }

  public get description() {
    return this.props.description;
  }

  public get view() {
    return this.props.children;
  }

  render() {
    return this.props.children;
  }
}
