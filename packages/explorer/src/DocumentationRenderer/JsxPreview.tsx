import React from "react";
import toJSX from "react-element-to-jsx-string";
import CodeBlock from "./CodeBlock";

interface Props {
  tree: React.ReactNode;
}

const JsxPreview: React.SFC<Props> = ({ tree }) => {
  if (React.isValidElement(tree)) {
    return (
      <CodeBlock language="jsx">
        {toJSX(tree, {
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
