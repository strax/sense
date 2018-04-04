import React from "react";

const moduleMap = new Map();

declare const SENSE_GUEST_PATH: string;

const ctx = require.context(
  SENSE_GUEST_PATH,
  true,
  /\/__examples__\/(.+)\.example\.(.+)$/
);
for (const path of ctx.keys()) {
  moduleMap.set(path, () => ctx(path).default);
}

export default moduleMap;
