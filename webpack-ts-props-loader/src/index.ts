import Parser from "./parser";
import Project, { Statement } from "ts-simple-ast";
import webpack from "webpack";
import ts from "typescript";
import * as fs from "fs";
import transform from "./transform";

export * from "./types";

const project = new Project({
  tsConfigFilePath: "../example/tsconfig.json",
  addFilesFromTsConfig: false
});

const sourceFile = project.addExistingSourceFile("../example/src/Button.tsx");

const parser = new Parser(sourceFile);
parser.parse();

export default function(this: webpack.loader.LoaderContext, source: string) {
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
