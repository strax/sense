import React from "react";
import CodeBlock from "../CodeBlock";
import { example, doc } from "@sense/core";

export const tsx = example(
  doc`
    TSX highlighting
  `,
  <CodeBlock language="tsx">
    {"<div className='container'>Hello world!</div>"}
  </CodeBlock>
);
