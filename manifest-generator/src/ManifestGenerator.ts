import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";
import * as minimatch from "minimatch";
import * as docgen from "react-docgen-typescript";
import { fromNullable } from "fp-ts/lib/Option";

interface ManifestEntry {
  filePath: string;
  components: docgen.ComponentDoc[];
}

const configurationFilePath = (root: string) =>
  ts.findConfigFile(root, fs.existsSync);

function sourceFiles(tsconfig: string) {
  const source = ts.readConfigFile(tsconfig, p => fs.readFileSync(p, "utf-8"));
  const config = ts.parseJsonConfigFileContent(
    source.config,
    ts.sys,
    path.resolve("components")
  );
  return config.fileNames;
}

const tsconfigPath = configurationFilePath("components");
if (!tsconfigPath) throw new Error("Could not find tsconfig.json");

const docgenFileParser = docgen.withCustomConfig(tsconfigPath, {});

const manifestForSourceFile = (filePath: string): ManifestEntry => {
  const components = docgenFileParser.parse(filePath);
  return { filePath, components };
};

const isEmpty = (as: any[]) => as.length === 0;

import * as util from "util";

console.log(
  util.inspect(
    sourceFiles(tsconfigPath)
      .map(manifestForSourceFile)
      .filter(doc => !isEmpty(doc.components)),
    { depth: Infinity }
  )
);
