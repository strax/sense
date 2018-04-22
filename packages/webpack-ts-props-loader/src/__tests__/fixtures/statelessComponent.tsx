import React from "react";

interface Props {
  name: string;
  other: number;
  delta: number;
}

export const Foo: React.SFC<Props> = props => <div>Hello world!</div>;

export const Bar: React.StatelessComponent<Props> = props => (
  <div>Hello bar!</div>
);
