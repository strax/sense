import React from "react";

interface Props {
  name: string;
  other: number;
  delta: number;
}

const Foo: React.SFC<Props> = props => <div>Hello world!</div>;

const Bar: React.StatelessComponent<Props> = props => <div>Hello bar!</div>;

class Comp extends React.Component<Props> {
  render() {
    return <div>foo</div>;
  }
}
