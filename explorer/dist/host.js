import React from "react";
import ReactDOM from "react-dom";
import ComponentView from "./ComponentView";
import components from "./guest";
class App extends React.Component {
    render() {
        return (React.createElement("div", null, Array.from(this.props.components.entries()).map(([name, component]) => {
            return React.createElement(ComponentView, { render: component, key: name });
        })));
    }
}
const root = document.body.appendChild(document.createElement("div"));
ReactDOM.render(React.createElement(App, { components: components }), root);
if (module.hot) {
    module.hot.accept(["./guest"], function () {
        ReactDOM.render(React.createElement(App, { components: components }), root);
    });
}
