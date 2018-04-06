import { SourceFile, Symbol } from "ts-simple-ast";
import { ComponentMetadata } from "./types";

export default function transform(
  sourceFile: SourceFile,
  metadata: ReadonlyMap<Symbol, ComponentMetadata>
) {
  metadata.forEach((metadata, symbol) => {
    sourceFile.addStatements(`
      Object.defineProperty(${symbol.getName()}, Symbol.for("react/metadata"), {
        value: ${JSON.stringify(metadata)},
        writable: false,
        enumerable: false
      });
    `);
  });
  return sourceFile;
}
