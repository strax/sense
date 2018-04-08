import Parser from "./parser";
import Project, { ts } from "ts-simple-ast";
import webpack from "webpack";
import transform from "./transform";
import memoize from "lodash.memoize";
import loaderUtils from "loader-utils";
export * from "./types";

const getProject = memoize((tsconfigPath: string) => {
  return new Project({
    tsConfigFilePath: tsconfigPath
  });
});

export default async function(this: webpack.loader.LoaderContext) {
  const done = this.async();
  const tsconfigPath = loaderUtils.getOptions(this).tsconfig as string;
  const sourceFile = getProject(tsconfigPath).getSourceFile(this.resourcePath);
  await sourceFile.refreshFromFileSystem();
  const parser = new Parser(sourceFile);
  const parsed = parser.parse();
  done(null, transform(sourceFile, parsed).getFullText());
}
