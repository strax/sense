import React from "react";
import { PropMetadata } from "@sense/webpack-ts-props-loader";
import SyntaxHighlighter from "react-syntax-highlighter";
import CodeBlock from "./CodeBlock";
import prettier, { Options as PrettierOptions } from "prettier";

const DEFAULT_PRETTIER_CONFIG: PrettierOptions = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: "babylon",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false
};

const comment = (body: string) => `
/**
${body
  .split("\n")
  .map(x => `   * ${x}`)
  .join("\n")}
   */
`;

const serialize = (props: PropMetadata[]) =>
  `interface Props {
${props.map(
    prop =>
      `${prop.description
        ? comment(prop.description)
        : ""}${prop.key}${prop.optional ? "?" : ""}:${prop.type}`
  )}
}
`;

const PropsTypeView: React.SFC<{ metadata: PropMetadata[] }> = props => {
  return (
    <CodeBlock language="typescript">
      {prettier.format(serialize(props.metadata), DEFAULT_PRETTIER_CONFIG)}
    </CodeBlock>
  );
};

export default PropsTypeView;
