import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import manifest from "../../manifest.json";
import * as docgen from "react-docgen-typescript";

interface ComponentManifest {
  filePath: string;
  components: docgen.ComponentDoc[];
  previewFilePath?: string;
}

interface Props {
  components: ComponentManifest[];
}

import(manifest[0].compiledFilePath).then(Component => {
  ReactDOM.render(<Component />, document.body);
});

console.table(manifest);
