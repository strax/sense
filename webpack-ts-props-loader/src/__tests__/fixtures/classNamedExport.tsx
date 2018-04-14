import React from "react";

interface Props {
  name: string;
  some: number;
}

export class Comp extends React.Component<Props> {
  render() {
    return <div>foo</div>;
  }
}
