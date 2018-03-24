import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";
import * as minimatch from "minimatch";
import * as docgen from "react-docgen-typescript";
import { fromNullable } from "fp-ts/lib/Option";

interface ComponentManifest {
  filePath: string;
  components: docgen.ComponentDoc[];
  previewFilePath?: string;
  compiledFilePath: string;
}

const configurationFilePath = (root: string) =>
  ts.findConfigFile(root, fs.existsSync);

const parseTypescriptConfiguration = (configPath: string) => {
  const source = ts.readConfigFile(configPath, p =>
    fs.readFileSync(p, "utf-8")
  );
  return ts.parseJsonConfigFileContent(
    source.config,
    ts.sys,
    path.resolve("components")
  );
};

function sourceFiles(config: ts.ParsedCommandLine) {
  return config.fileNames;
}

const tsconfigPath = configurationFilePath("components");
if (!tsconfigPath) throw new Error("Could not find tsconfig.json");
const tsconfig = parseTypescriptConfiguration(tsconfigPath);

const previewFilePath = (projectFiles: string[]) => (
  componentFilePath: string
) => {
  const { name: componentName, dir } = path.parse(componentFilePath);
  const examplesDir = path.join(dir, "__previews__");
  return projectFiles.find(sourcePath => {
    const parsedSourcePath = path.parse(sourcePath);
    return (
      parsedSourcePath.dir === examplesDir &&
      parsedSourcePath.name === componentName + ".preview"
    );
  });
};

const docgenFileParser = docgen.withCustomConfig(tsconfigPath, {});
const projectBasePath = path.resolve(tsconfig.options.baseUrl!);

const normalizePath = (absolutePath: string) => {
  return path.relative(projectBasePath, absolutePath);
};

const withPreviewPath = (projectFiles: string[]) => (
  manifest: ComponentManifest
): ComponentManifest => {
  const previewPath = normalizePath(
    previewFilePath(projectFiles)(manifest.filePath)!
  );
  return { ...manifest, previewFilePath: previewPath };
};

const makeCompiledFilePath = (rootPath: string, sourcePath: string): string => {
  const relativeSourceDir = path.relative(rootPath, path.dirname(sourcePath));
  const { name: fileNameWithoutExt } = path.parse(sourcePath);
  const fullpath = path.join(relativeSourceDir, fileNameWithoutExt + ".js");
  return normalizePath(fullpath);
};

const manifestForSourceFile = (
  filePath: string,
  index: number,
  projectFiles: string[]
): ComponentManifest => {
  const components = docgenFileParser.parse(filePath);
  return {
    filePath: filePath,
    components,
    compiledFilePath: makeCompiledFilePath(projectBasePath, filePath)
  };
};

const isEmpty = (as: any[]) => as.length === 0;

import * as util from "util";

const projectFiles = sourceFiles(tsconfig);

// console.dir(projectFiles.map(manifestForSourceFile));

const output = JSON.stringify(
  sourceFiles(tsconfig)
    .filter(x => x)
    .map(manifestForSourceFile)
    .filter(doc => !isEmpty(doc.components))
    .map(withPreviewPath(projectFiles))
);

fs.writeFileSync("manifest.json", output, { encoding: "utf-8" });
