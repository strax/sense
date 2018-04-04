import typescript from "rollup-plugin-typescript2";
import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es"
  },
  plugins: [typescript({ tsconfig: "tsconfig.json" })]
};
