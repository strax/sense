import React from "react";
import { Example } from "@sense/core";
import toJSX from "react-element-to-jsx-string";
// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { ghcolors } from "react-syntax-highlighter/styles/prism";

const JsxPreview: React.SFC<{ example: Example }> = ({ example }) => {
  const root = example.view;
  if (React.isValidElement(root)) {
    return (
      <SyntaxHighlighter language="jsx" style={ghcolors}>
        {toJSX(root, {
          showFunctions: true,
          maxInlineAttributesLineLength: 80
        })}
      </SyntaxHighlighter>
    );
  } else {
    return <span>JSX preview not available</span>;
  }
};

export default JsxPreview;
