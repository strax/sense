import React from "react";

interface Props {
  name: string;
  some: number;
}

export default class Comp extends React.Component<Props> {
  render() {
    return <div>foo</div>;
  }
}
