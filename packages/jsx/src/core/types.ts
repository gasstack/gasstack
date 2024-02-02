export type JsxCallbackFn = (...args: any[]) => void | Promise<void>;

export type jsxBuildFn = (parent: any) => object;
export type jsxFC<T = {}, C = jsxBuildFn> = (
  props: { children?: C | C[] } & T
) => jsxBuildFn;
