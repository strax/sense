import React from "react";
import Markdown from "react-markdown";
import { stripIndent } from "common-tags";
import styled from "styled-components";
import { flatten, zip } from "ramda";
export { default as props } from "./props";

export interface Props {
  component?: React.ComponentType;
  description?: string | React.ReactElement<any>;
}

export function doc(
  segments: TemplateStringsArray,
  ...interpolations: React.ReactNode[]
) {
  return (
    <>
      {flatten(
        zip(
          segments.map((segment, i) => (
            <Markdown source={segment.trimLeft()} key={i} />
          )),
          interpolations
        )
      )}
    </>
  );
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
