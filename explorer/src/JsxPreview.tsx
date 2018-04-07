import React from "react";
import { Example } from "@sense/core";
import toJSX from "react-element-to-jsx-string";
// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { ghcolors } from "react-syntax-highlighter/styles/prism";

// const name = (element: React.ReactElement<any>) => {
//   const t = element.type;
//   if (typeof t === "string") {
//     return t;
//   } else {
//     return t.displayName || t.name;
//   }
// };

// const quote = (x: any) => `{${x}}`;

// const value = (x: any) => {
//   switch (typeof x) {
//     case "string":
//       return JSON.stringify(x);
//     case "number":
//       return quote(x);
//     case "function":
//       return quote(String(x));
//   }
// };

// function* props(element: React.ReactElement<any>) {
//   for (const [k, v] of Object.entries(element.props)) {
//     yield `${k}=${value(v)}`;
//   }
// }

// const element = (element: React.ReactElement<any>) => {
//   return `<${name(element)} ${Array.from(props(element)).join(" ")} />`;
// };

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
