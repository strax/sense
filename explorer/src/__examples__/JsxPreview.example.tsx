import React from "react";
import { example, doc, props } from "@sense/core";
import JsxPreview from "../JsxPreview";

const Wrapper: React.SFC<{ name: string }> = props => (
  <div>Hello ${props.name}</div>
);

export default example(
  doc`
    ${props(JsxPreview)}
  `,
  <JsxPreview tree={<Wrapper name="foo" />} />
);
