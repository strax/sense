import React from "react";
const ComponentName = props => {
    if (props.component) {
        return React.createElement("h3", null, props.component.name);
    }
    else {
        return null;
    }
};
export class Example extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(ComponentName, { component: this.props.component })));
    }
}
