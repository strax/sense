import { Example } from "@sense/core";
import { Module } from "webpack";

type Props<T> = T extends React.Component<infer P> ? P : never;

export default class ModuleMap extends Map<string, Record<string, Example>> {}
