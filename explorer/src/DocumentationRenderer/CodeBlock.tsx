import React from "react";

// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter/prism";

import { duotoneDark } from "react-syntax-highlighter/styles/prism";

export interface Props {
  language: string;
}

const CodeBlock: React.SFC<Props> = props => (
  <SyntaxHighlighter
    language={props.language}
    style={duotoneDark}
    customStyle={{
      background: "none",
      fontFamily: "inherit",
      padding: 0,
      lineHeight: "1.75"
    }}
    codeTagProps={{
      style: {
        background: "none",
        fontFamily: '"SF Mono", "Menlo", "Consolas", monospace',
        WebkitFontSmoothing: "subpixel-antialiased"
      }
    }}
  >
    {props.children}
  </SyntaxHighlighter>
);

export default CodeBlock;
