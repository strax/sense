import React from "react";
import { ComponentMetadata } from "@sense/webpack-ts-props-loader";
import componentMetadata from "./componentMetadata";
import { HostContext } from "@sense/core";
import Block from "./Block";
import PropsTypeView from "./PropsTypeView";

type ReactTree = React.ReactElement<any> | React.ReactText;

const componentsFromTree = (root: ReactTree): Set<React.ComponentType> => {
  if (typeof root === "string" || typeof root === "number") {
    return new Set();
  } else {
    const subtree = React.Children
      .toArray(root.props.children)
      .reduce((acc, child) => [...acc, ...componentsFromTree(child)], [
        root.type
      ])
      .filter(type => typeof type !== "string") as React.ComponentType[];
    return new Set(subtree);
  }
};

const propTypes = (tree: React.ReactElement<any>) => {
  return Array.from(componentsFromTree(tree)).map(
    componentMetadata
  ) as ComponentMetadata[];
};

const PropTypesBlock: React.SFC = () => (
  <HostContext.Consumer>
    {ctx => {
      const definitions = propTypes(ctx.example.render);
      return definitions.map(meta => (
        <Block header={`${meta.name} props`}>
          <PropsTypeView metadata={meta.props} />
        </Block>
      ));
    }}
  </HostContext.Consumer>
);

export default PropTypesBlock;
