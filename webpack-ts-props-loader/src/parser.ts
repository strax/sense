import {
  Node,
  Symbol,
  Type,
  InterfaceDeclaration,
  TypeLiteralNode,
  SourceFile,
  ClassDeclaration
} from "ts-simple-ast";
import ts from "typescript";
import assert from "assert";
import { ComponentMetadata, PropMetadata } from "./types";

function getClassSymbol(node: ClassDeclaration): Symbol {
  // @ts-ignore
  if (node.compilerNode.localSymbol) {
    // @ts-ignore
    return node.compilerNode.localSymbol;
  } else {
    return node.getSymbol();
  }
}

export default class Parser {
  private parsed = new Map<Symbol, ComponentMetadata>();

  constructor(private source: SourceFile) {}

  parse(): ReadonlyMap<Symbol, ComponentMetadata> {
    for (const sym of this.source.getExportSymbols()) {
      sym.getDeclarations().forEach(expr => this.visit(expr));
    }
    return this.parsed;
  }

  private parseStatelessComponent(node: Node<any>) {
    const type = node.getType();
    if (type.getSymbol().getName() === "StatelessComponent") {
      const props = type.getTypeArguments()[0];
      if (!this.parsed.has(node.getSymbol())) {
        this.parsed.set(node.getSymbol(), {
          name: node.getSymbol().getName(),
          props: this.extractProps(props)
        });
      }
    }
  }

  private parseDeclaration(
    node: InterfaceDeclaration | TypeLiteralNode
  ): Array<PropMetadata> {
    const props = [];
    for (const member of node.getProperties()) {
      const prop = {
        key: member.getName(),
        description: member
          .getJsDocs()
          .map(doc => doc.getInnerText())
          .join(""),
        type: member.getType().getText(),
        optional: member.hasQuestionToken()
      };
      props.push(prop);
    }
    return props;
  }

  private visit(node: Node<any>) {
    switch (node.getKind()) {
      case ts.SyntaxKind.VariableDeclaration:
        this.parseStatelessComponent(node);
        break;
      case ts.SyntaxKind.ClassDeclaration:
        this.parseClassComponent(node as ClassDeclaration);
    }
  }

  private extractProps(type: Type) {
    const node = type.getSymbol().getDeclarations()[0];
    if (type.isInterfaceType()) {
      assert(node.getKind() === ts.SyntaxKind.InterfaceDeclaration);
      return this.parseDeclaration(node as InterfaceDeclaration);
    } else if (type.isObjectType()) {
      return this.parseDeclaration(node as TypeLiteralNode);
    }
  }

  private parseClassComponent(node: ClassDeclaration) {
    const type = node.getType();
    const sym = getClassSymbol(node);
    type.getBaseTypes().forEach(supertype => {
      if (supertype.getSymbol().getName() === "Component") {
        const props = supertype.getTypeArguments()[0];
        if (!this.parsed.has(sym)) {
          this.parsed.set(sym, {
            name: sym.getName(),
            props: this.extractProps(props)
          });
        }
      }
    });
  }
}
