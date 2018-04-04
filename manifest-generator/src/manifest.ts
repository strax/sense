import * as fs from "fs";
import * as path from "path";
import * as Docgen from "react-docgen-typescript";
import { ComponentDoc } from "react-docgen-typescript";
import Project from "./Project";

export interface ExampleManifest {
  path: string;
}

export interface ComponentManifest extends ComponentDoc {
  path: string;
  examples: ExampleManifest[];
}

export interface ProjectManifest {
  root: string;
  components: ComponentManifest[];
}

interface ParserLike {
  parse(path: string): ComponentDoc[];
}

interface ParseContext {
  project: Project;
  parser: ParserLike;
}

const isEmpty = (xs: any[]) => xs.length == 0;

const relativePath = (ctx: ParseContext, absolutePath: string) =>
  path.relative(ctx.project.path, absolutePath);

function* findExampleModules(
  ctx: ParseContext,
  componentPath: string,
  componentName: string
): Iterable<string> {
  const exampleDir = path.join(path.dirname(componentPath), "__examples__");
  if (fs.existsSync(exampleDir)) {
    const exampleFiles = fs.readdirSync(exampleDir);
    for (const exampleFile of exampleFiles) {
      const { name } = path.parse(exampleFile);
      if (componentName + ".example" === name) {
        yield path.join(path.relative(ctx.project.basePath, exampleDir), name);
      }
    }
  }
}

function exampleManifest(examplePath: string): ExampleManifest {
  return { path: examplePath };
}

function* parseSourceFile(
  ctx: ParseContext,
  file: string
): Iterable<ComponentManifest> {
  for (const doc of ctx.parser.parse(file)) {
    const examples = Array.from(
      findExampleModules(ctx, file, doc.displayName)
    ).map(exampleManifest);
    yield { ...doc, examples, path: relativePath(ctx, file) };
  }
}

function* parseComponents(ctx: ParseContext): Iterable<ComponentManifest> {
  for (const sourceFile of ctx.project.sourceFiles) {
    yield* parseSourceFile(ctx, sourceFile);
  }
}

export function makeProjectManifest(project: Project): ProjectManifest {
  const parser = Docgen.withCustomConfig(project.configurationFilePath, {});
  const ctx: ParseContext = { parser, project };

  const components = Array.from(parseComponents(ctx));

  return { root: project.path, components };
}
