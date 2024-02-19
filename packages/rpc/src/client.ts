import { ClientApi, ServerRunMethods } from "./types";

/**
 * Client proxy object. Provides a couple of methods for each server enpoint method of the provided descriptor.
 * The first method has the same API as the descriptor, the second has a prefix "ctx_" prepended and expects a context
 * argument as the first parameter of the function.
 */
export type RpcClientProxy<T extends ServerRunMethods> = {
  [P in keyof T]: (
    ...params: Parameters<T[P]>
  ) => Promise<[Awaited<ReturnType<T[P]>>, void]>;
} & {
  [P in keyof T & string as `ctx_${P}`]: <C>(
    ctx: C,
    ...params: Parameters<T[P]>
  ) => Promise<[Awaited<ReturnType<T[P]>>, C]>;
};

/**
 * Create a proxy client for the global object of the Google Apps Script application.
 * @returns RPC proxy client.
 */
export function createClient<T extends ServerRunMethods>(): RpcClientProxy<T> {
  const hdl = window.google as ClientApi<T>;

  return new Proxy(hdl.script, {
    get(target, propName, receiver) {
      const runner = target.run;
      const propString = String(propName);
      const isPropWithCtx = /^ctx_/.test(propString);
      const prop = propString.replace(/^ctx_/, "");
      if (prop in runner === false)
        throw new Error(`Unknown Google App Script remote function '${prop}'`);

      return (...params: any[]) => {
        return new Promise((resolve, reject) => {
          let prep = runner
            .withFailureHandler((error, ctx) => reject([error, ctx]))
            .withSuccessHandler((result, ctx) => resolve([result, ctx]));
          if (isPropWithCtx && params[0] !== null && params[0] !== undefined) {
            prep.withUserObject(params[0])[prop].apply(null, params.slice(1));
          } else {
            prep[prop].apply(null, params);
          }
        });
      };
    },
  }) as any as RpcClientProxy<T>;
}

/**
 * Create a proxy client which uses a specific "scoping" function to invoke the endpoint methods.
 * @returns RPC proxy client.
 */
export function createScopedClient<T extends ServerRunMethods>(
  scopingFnName: string
): RpcClientProxy<T> {
  const hdl = window.google as ClientApi<T>;

  return new Proxy(hdl.script, {
    get(target, propName, receiver) {
      const runner = target.run;
      const propString = String(propName);
      const isPropWithCtx = /^ctx_/.test(propString);
      const prop = propString.replace(/^ctx_/, "");

      return (...params: any[]) => {
        return new Promise((resolve, reject) => {
          let prep = runner
            .withFailureHandler((error, ctx) => reject([error, ctx]))
            .withSuccessHandler((result, ctx) => resolve([result, ctx]));
          if (isPropWithCtx && params[0] !== null && params[0] !== undefined) {
            prep
              .withUserObject(params[0])
              [scopingFnName].apply(null, [prop, ...params.slice(1)]);
          } else {
            prep[scopingFnName].apply(null, [prop, ...params]);
          }
        });
      };
    },
  }) as any as RpcClientProxy<T>;
}
