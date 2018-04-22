import { Example } from "@sense/core";

export interface ExampleDefinition {
  path: string;
  name: string;
  example: Example;
}

// Globals injected by webpack
declare const CWD: string;
declare const EXAMPLE_FILE_PATTERN: RegExp;

const ctx = require.context(CWD, true, EXAMPLE_FILE_PATTERN);
const examples: ExampleDefinition[] = [];
for (const path of ctx.keys()) {
  const exports = ctx(path) as Record<string, Example>;
  for (const [name, example] of Object.entries(exports)) {
    examples.push({ name, example, path: path.substr(2) });
  }
}

export default Object.freeze(examples);
