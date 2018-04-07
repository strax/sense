import React from "react";
import { PropMetadata } from "@sense/webpack-ts-props-loader";
import SyntaxHighlighter from "react-syntax-highlighter";
import CodeBlock from "./CodeBlock";

const format = (props: PropMetadata[]) => `{
${props
  .map(prop => `  ${prop.key}${prop.optional ? "?" : ""}: ${prop.type}`)
  .join("\n")}
}
`;

const PropsTypeView: React.SFC<{ metadata: PropMetadata[] }> = props => {
  return <CodeBlock language="typescript">{format(props.metadata)}</CodeBlock>;
};

export default PropsTypeView;
