import React from "react";

interface Props {
  name: string;
  other: number;
  delta: number;
}

const SomeComp: React.SFC<Props> = props => <div>Hi</div>;

export default SomeComp;
