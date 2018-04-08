import ModuleMap from "./ModuleMap";

const moduleMap = new ModuleMap();

declare const SENSE_GUEST_PATH: string;

const ctx = require.context(
  SENSE_GUEST_PATH,
  true,
  /\/__examples__\/(.+)\.example\.(.+)$/
);
for (const path of ctx.keys()) {
  moduleMap.set(path.substr(2), ctx(path));
}

export default moduleMap;
