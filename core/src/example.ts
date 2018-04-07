import React from "react";
import { DocumentationNode } from ".";

export class Example {
  constructor(
    public readonly render: JSX.Element,
    public readonly description: DocumentationNode[]
  ) {}
}

export function example(render: JSX.Element): Example;
export function example(doc: DocumentationNode[], render: JSX.Element): Example;
export function example(
  docOrRender: DocumentationNode[] | JSX.Element,
  render?: JSX.Element
) {
  if (render === undefined) {
    return example([], docOrRender as JSX.Element);
  } else {
    const doc = docOrRender as DocumentationNode[];
    return new Example(render, doc);
  }
}
