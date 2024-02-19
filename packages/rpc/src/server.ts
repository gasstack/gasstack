import { ServerRunMethods } from "./types";

/**
 * Allows the inclusion of an html file inside a template. Example: <?!= include("data/test", {id:3}) ?>
 * @param filename File to be included.
 * @param params Parameters for the included template.
 * @returns HTML to be rendered.
 */
export function include(
  filename: string,
  params?: { [key: string]: any }
): string {
  const tpl = HtmlService.createTemplateFromFile(filename);

  if (!!params) Object.keys(params).map((key) => (tpl[key] = params[key]));

  return tpl.evaluate().getContent();
}

export type RpcEndpoint = {
  invoke(name: string, ...params: any[]): any;
};

/**
 * Creates an RPC enpoint.
 * @param methods Endpoint descriptor.
 * @returns Rpc endpoint able to invoke the configured functions.
 */
export function createEndpoint<T extends ServerRunMethods>(
  methods: T
): RpcEndpoint {
  const app: ServerRunMethods = Object.keys(methods).reduce(
    (acc, name) => ({
      ...acc,
      [name]: methods[name].bind(null),
    }),
    {}
  );

  return {
    invoke(name: string, ...params: any[]): any {
      if (name in app === false) throw new Error(`Unknown function ${name}`);

      return app[name].apply(null, params);
    },
  } satisfies RpcEndpoint;
}
