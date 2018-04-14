import React from "react";
import ReactDOM from "react-dom";
import examples from "./examples";
import App from "./App";

const root =
  (module.hot && module.hot.data && module.hot.data.root) ||
  document.body.appendChild(document.createElement("div"));

ReactDOM.render(<App examples={examples} />, root);

if (module.hot) {
  module.hot.dispose(data => {
    data.root = root;
  });
  module.hot.accept();
}
