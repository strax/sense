import React from "react";
import { example } from "@sense/core";
import PropsTypeView from "../PropsTypeView";
import { PropMetadata } from "@sense/webpack-ts-props-loader";

const metadata: PropMetadata[] = [
  {
    key: "prop1",
    description: "First description.",
    optional: true,
    type: "() => void"
  },
  {
    key: "prop2",
    optional: false,
    type: "string"
  }
];

export default example(<PropsTypeView metadata={metadata} />);
