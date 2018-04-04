import React from "react";
import Markdown from "react-markdown";

interface Props {
  component?: React.ComponentType<any>;
  description?: string | React.ReactElement<any>;
}

const ComponentName: React.SFC<{
  component: React.ComponentType<any> | undefined;
}> = props => {
  if (props.component) {
    return <h3>{props.component.name}</h3>;
  } else {
    return null;
  }
};

export class Example extends React.Component<Props> {
  render() {
    return (
      <div>
        <ComponentName component={this.props.component} />
      </div>
    );
  }
}
