import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export const lazyNamed = <T extends Record<string, ComponentType<any>>>(
  factory: () => Promise<T>,
  name: keyof T,
): LazyExoticComponent<T[keyof T]> =>
  lazy(() => factory().then((mod) => ({ default: mod[name] })));
