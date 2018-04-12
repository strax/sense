import ModuleMap from "./ModuleMap";

const moduleMap = new ModuleMap();

declare const CWD: string;
declare const EXAMPLE_FILE_PATTERN: RegExp;

const ctx = require.context(CWD, true, EXAMPLE_FILE_PATTERN);
for (const path of ctx.keys()) {
  moduleMap.set(path.substr(2), ctx(path));
}

export default moduleMap;
