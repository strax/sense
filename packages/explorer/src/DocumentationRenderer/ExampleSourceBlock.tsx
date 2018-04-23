import React from "react";
import Block from "./Block";
import { HostContext } from "@sense/core";
import JsxPreview from "./JsxPreview";

const ExampleSourceBlock: React.SFC = () => (
  <HostContext.Consumer>
    {ctx => (
      <Block header="Example source">
        <JsxPreview tree={ctx.example.render} />
      </Block>
    )}
  </HostContext.Consumer>
);

export default ExampleSourceBlock;
