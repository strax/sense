import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";

export default class Project {
  private tsconfig!: ts.ParsedCommandLine;

  constructor(public readonly path: string) {}

  get configuration(): ts.ParsedCommandLine {
    if (!this.tsconfig) {
      this.tsconfig = this.readParseTsconfig();
    }
    return this.tsconfig;
  }

  get configurationFilePath(): string {
    return path.join(this.path, "tsconfig.json");
  }

  get sourceFiles(): string[] {
    return this.configuration.fileNames;
  }

  get basePath(): string {
    return path.resolve(this.configuration.options.baseUrl || this.path);
  }

  modulePathForFile(filePath: string): string {
    const { dir, name } = path.parse(filePath);
    return path.join(path.relative(this.basePath, dir), name);
  }

  private readParseTsconfig(): ts.ParsedCommandLine {
    const raw = ts.readConfigFile(this.configurationFilePath, _ =>
      fs.readFileSync(_, "utf-8")
    );
    return ts.parseJsonConfigFileContent(raw.config, ts.sys, this.path);
  }
}
