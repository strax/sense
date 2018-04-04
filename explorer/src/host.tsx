import React from "react";
import ReactDOM from "react-dom";
import ComponentView from "./ComponentView";
import components from "./guest";

declare const SENSE_MANIFEST: string;

interface HotContext {
  root: HTMLElement;
}

interface Props {
  components: ReadonlyMap<string, () => JSX.Element>;
}

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        {Array.from(this.props.components.entries()).map(
          ([name, component]) => (
            <ComponentView path={name} render={component} key={name} />
          )
        )}
      </div>
    );
  }
}

const root =
  (module.hot && (module.hot.data as HotContext) && module.hot.data) ||
  document.body.appendChild(document.createElement("div"));

ReactDOM.render(<App components={components} />, root);

if (module.hot) {
  module.hot.dispose(data => {
    data.root = root;
  });
  module.hot.accept();
}
