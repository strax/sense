import React from "react";
import { Example } from "@sense/core";
import toJSX from "react-element-to-jsx-string";
import CodeBlock from "./CodeBlock";

const JsxPreview: React.SFC<{ example: Example }> = ({ example }) => {
  const root = example.render;
  if (React.isValidElement(root)) {
    return (
      <CodeBlock language="jsx">
        {toJSX(root, {
          showFunctions: true,
          maxInlineAttributesLineLength: 80
        })}
      </CodeBlock>
    );
  } else {
    return <span>JSX preview not available</span>;
  }
};

export default JsxPreview;
