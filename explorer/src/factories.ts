import { PropMetadata } from "@sense/webpack-ts-props-loader";

export function genPropMetadata(): PropMetadata {
  return {
    key: "prop1",
    description: "Property description",
    type: "string",
    optional: false
  };
}
