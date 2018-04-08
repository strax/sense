import React from "react";
import ReactDOM from "react-dom";
import modules from "./guest";
import App from "./App";
import ModuleMap from "./ModuleMap";

interface Props {
  components: ModuleMap;
}

const root =
  (module.hot && module.hot.data && module.hot.data.root) ||
  document.body.appendChild(document.createElement("div"));

ReactDOM.render(<App modules={modules} />, root);

if (module.hot) {
  module.hot.dispose(data => {
    data.root = root;
  });
  module.hot.accept();
}
