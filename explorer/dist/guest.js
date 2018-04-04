import React from "react";
const examples = new Map();
// const ctx = require.context(
//   SENSE_GUEST_PATH,
//   true,
//   /\/__examples__\/(.+)\.example\.(.+)$/
// );
// for (const path of ctx.keys()) {
//   examples.set(path, () => ctx(path).default);
// }
examples.set("foo", () => React.createElement("div", null, "sizz"));
export default examples;
