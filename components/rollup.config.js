import typescript from "rollup-plugin-typescript2";
import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: ["src/**/*.tsx", "src/**/*.ts"],
  output: {
    file: "dist/bundle.js",
    dir: "dist",
    format: "es"
  },
  plugins: [multiEntry(), typescript({ tsconfig: "tsconfig.json" })]
};
