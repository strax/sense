import React from "react";
import { zip, flatten } from "ramda";
import stripIndent from "strip-indent";

export interface MarkdownNode {
  type: "MarkdownNode";
  content: string;
}
const markdown = (content: string): MarkdownNode => ({
  type: "MarkdownNode",
  content
});

export type DocumentationNode = MarkdownNode;

export function doc(
  segments: TemplateStringsArray,
  ...interpolations: DocumentationNode[]
): DocumentationNode[] {
  const markdownNodes = segments.map(stripIndent).map(markdown);
  return flatten(zip(markdownNodes, interpolations));
}
