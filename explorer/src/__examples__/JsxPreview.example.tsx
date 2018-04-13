import React from "react";
import { example } from "@sense/core";
import JsxPreview from "../JsxPreview";

const Wrapper: React.SFC<{ name: string }> = props => (
  <div>Hello ${props.name}</div>
);

export default example(<JsxPreview tree={<Wrapper name="foo" />} />);
