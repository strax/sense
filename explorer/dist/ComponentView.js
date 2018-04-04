import React from "react";
import ReactDOM from "react-dom";
export default class ComponentView extends React.Component {
    componentDidMount() {
        ReactDOM.render(this.props.render(), this.mountNode);
    }
    render() {
        return React.createElement("div", { ref: node => node && (this.mountNode = node) });
    }
}
