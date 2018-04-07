import React from "react";
import { zip, flatten } from "ramda";

export interface MarkdownNode {
  type: "MarkdownNode";
  content: string;
}
const markdown = (content: string): MarkdownNode => ({
  type: "MarkdownNode",
  content
});

export interface PropsNode {
  type: "PropsNode";
  component: React.ComponentType;
}
export const props = (component: React.ComponentType): PropsNode => ({
  type: "PropsNode",
  component
});

export type DocumentationNode = MarkdownNode | PropsNode;

export function doc(
  segments: TemplateStringsArray,
  ...interpolations: DocumentationNode[]
): DocumentationNode[] {
  const markdownNodes = segments.map(markdown);
  return flatten(zip(markdownNodes, interpolations));
}
