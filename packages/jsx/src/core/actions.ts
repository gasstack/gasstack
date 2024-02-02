import { JsxCallbackFn } from "./types";

const functionStore: { id: string; callback: JsxCallbackFn }[] = [];

export function functionAsId(fn: JsxCallbackFn): string {
  const item = functionStore.find(({ id, callback }) => callback === fn);
  if (!item) {
    const id = `fn_${Date.now()}_${Math.round(Math.random() * 1000)}_${
      fn.name ?? ""
    }`;
    functionStore.push({
      id: id,
      callback: fn,
    });
    return id;
  } else {
    return item.id;
  }
}

export function invokeJsxCallback(fnId: string, ...params: any[]) {
  const fn = functionStore.find(({ id }) => id == fnId)?.callback;
  fn?.apply(null, params);
}
