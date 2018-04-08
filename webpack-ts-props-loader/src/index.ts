import Parser from "./parser";
import Project from "ts-simple-ast";
import webpack from "webpack";
import ts from "typescript";
import * as fs from "fs";
import transform from "./transform";

export * from "./types";

export default function(this: webpack.loader.LoaderContext) {
  const tsconfigPath = ts.findConfigFile(this.resourcePath, f =>
    fs.existsSync(f)
  );
  const project = new Project({
    tsConfigFilePath: tsconfigPath,
    addFilesFromTsConfig: false
  });
  project.addExistingSourceFile(this.resourcePath);
  const sourceFile = project.getSourceFile(this.resourcePath);
  const parser = new Parser(sourceFile);
  const parsed = parser.parse();
  return transform(sourceFile, parsed).print();
}
