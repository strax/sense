import React from "react";

interface Props {
  name: string;
  /**
   * A some property.
   */
  some: number;
}

export default class Comp extends React.Component<Props> {
  render() {
    return <div>foo</div>;
  }
}
