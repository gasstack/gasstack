export type UICallbackFn = (...args: any[]) => void | Promise<void>; //TODO: maybe has to retrun cards or action or something

const functionStore: { id: string; callback: UICallbackFn }[] = [];

export function uiCallbackAsId(fn: UICallbackFn): string {
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

export function invokeUICallback(fnId: string, ...params: any[]) {
  const fn = functionStore.find(({ id }) => id == fnId)?.callback;
  fn?.apply(null, params);
}

export type uiFC<R, T = any> = (props: T) => R;
