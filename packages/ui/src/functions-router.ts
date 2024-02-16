export type RoutableFunction<P extends Array<any>, R> = (...args: P) => R;

export type RoutedFunctionKey<P extends Array<any>, R> = string & {
  __brand: "routedFunctionKey";
  __p: P;
  __r: R;
};

export type FunctionRouter<
  T extends Record<string, RoutableFunction<any, any>>
> = {
  [K in keyof T]: T[K] extends RoutableFunction<infer P, infer R>
    ? RoutedFunctionKey<P, R>
    : never;
};

const storePropName = "GASSTACK_UI_FR";

/**
 * Creates and configures a router to set and execute managed functions.
 * @param config Key-Value object of named action functions.
 * @returns Provider function, producing scoped setters for generic functions.
 */
export function createFunctionRouter<
  T extends {
    [key: string]: RoutableFunction<any, any>;
  }
>(config: T): FunctionRouter<T> {
  const router: Record<string, RoutedFunctionKey<any, any>> = {};

  const globalThis = Function("return this;")();

  const functionStore: Record<string, RoutableFunction<any, any>> = {};
  globalThis[storePropName] = functionStore;

  Object.keys(config).forEach((key) => {
    functionStore[key] = config[key].bind(null);

    router[key] = `${storePropName}.${key}` as RoutedFunctionKey<any, any>;
  });

  return router as FunctionRouter<T>;
}
