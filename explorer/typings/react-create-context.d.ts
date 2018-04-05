import React from "react";

declare module "react" {
  export type Provider<T> = React.ComponentType<{ value: T }>;
  export type Consumer<T> = ComponentType<{
    children: (value: T) => ReactNode;
    unstable_observedBits?: number;
  }>;
  export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
  }
  export function createContext<T>(
    defaultValue: T,
    calculateChangedBits?: (prev: T, next: T) => number
  ): Context<T>;
  export function createContext<T>(): Context<T | undefined>;
}
