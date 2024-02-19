import {
  ClientApi,
  ClientRunMethods,
  HistoryChangeEventHandler,
  Location,
  Run,
  RunFailureFn,
  RunSuccessFn,
} from "./types";

type HistoryParams = {
  state: object;
  params: { [key: string]: string | string[] };
  hash: string;
};

const history: {
  stack: HistoryParams[];
  changeHandler?: HistoryChangeEventHandler;
} = {
  stack: [],
  changeHandler: undefined,
};

function triggerHistoryChanged({ state, params, hash }: HistoryParams) {
  history.changeHandler?.({
    state,
    location: {
      hash,
      parameter: Object.keys(params)
        .map((key) => ({
          [key]: Array.isArray(params[key])
            ? (params[key] as string[])[0]
            : (params[key] as string),
        }))
        .reduce((acc, p) => ({ ...acc, ...p }), {}),
      parameters: Object.keys(params)
        .map((key) => ({
          [key]: Array.isArray(params[key])
            ? (params[key] as string[])
            : [params[key] as string],
        }))
        .reduce((acc, p) => ({ ...acc, ...p }), {}),
    },
  });
}

export type MockRunMethods<T extends ClientRunMethods> = {
  [P in keyof T]: (...p: Parameters<T[P]>) => Promise<any>;
};

export type ScopedMocksRecord = { [key: string]: MockRunMethods<any> };

/**
 * Create an RPC endpoint mock and initilize the global window object in order to behave as close as possible to the real
 * RPC Google Apps Script proxy.
 * @param globalMock Global scope function mocking descriptor.
 * @param scopedMocks Function scoped function mocking descriptor.
 * @returns The typed window.google proxy to use. It is just a convenience handle, given the fact that the real window.google object is modified.
 */
export function setupMocks<
  T extends ClientRunMethods,
  C extends ScopedMocksRecord
>(globalMock: MockRunMethods<T>, scopedMocks?: C) {
  const mocks = {
    ...globalMock,
    ...Object.keys(scopedMocks ?? {}).reduce(
      (acc, key) => ({
        ...acc,
        [key]: (fnName: string, ...params: any[]) => {
          if (fnName in scopedMocks[key]! === false)
            throw new Error(`Unknown function ${fnName}`);

          return scopedMocks![key][fnName].apply(null, params);
        },
      }),
      {}
    ),
  };

  window.google = {
    script: {
      history: {
        push(
          state: object,
          params: { [key: string]: string | string[] },
          hash: string
        ): void {
          console.log(
            `google:script:history:push -> ${state}, ${params}, ${hash}`
          );
          history.stack.push({ state, params, hash });
          triggerHistoryChanged({ state, params, hash });
        },
        replace(
          state: object,
          params: { [key: string]: string | string[] },
          hash: string
        ): void {
          console.log(
            `google:script:history:replace -> ${state}, ${params}, ${hash}`
          );
          if (history.stack.length == 0)
            history.stack.push({ state, params, hash });
          else
            history.stack[history.stack.length - 1] = { state, params, hash };

          triggerHistoryChanged({ state, params, hash });
        },
        setChangeHandler(fn: HistoryChangeEventHandler | null): void {
          console.log(`google:script:history:setChangeHandler`);
          history.changeHandler = fn?.bind(null) ?? null;
        },
      },
      url: {
        getLocation(fn: (e: Location) => void): void {
          console.log(`google:script:url:getLocation`);

          fn({
            hash: window.location.hash,
            parameter: window.location.search.split("&").reduce((acc, kv) => {
              const [k, v] = kv.split("=");
              if (acc[k] === undefined) acc[k] = v;
              return acc;
            }, {}),
            parameters: window.location.search.split("&").reduce((acc, kv) => {
              const [k, v] = kv.split("=");
              if (acc[k] === undefined) acc[k] = [v];
              else acc[k].push(v);
              return acc;
            }, {}),
          });
        },
      },
      host: {
        get origin(): string {
          console.log(`google.script.host.origin`);
          return window.location.origin;
        },
        close(): void {
          console.log(`google.script.host.close`);
        },
        setHeight(value: number): void {
          console.log(`google.script.host.setHeight -> ${value}`);
          // document.body.style.height = `${value}px`;
        },
        setWidth(value: number): void {
          console.log(`google.script.host.setWidth -> ${value}`);
          // document.body.style.width = `${value}px`;
        },
        editor: {
          focus(): void {
            console.log(`google.script.host.editor.focus`);
          },
        },
      },
      get run() {
        let successFn: RunSuccessFn | null = null;
        let failureFn: RunFailureFn | null = null;
        let stateObj: object | null = null;
        const runner = {
          withFailureHandler(fn: RunFailureFn | null) {
            failureFn = fn?.bind(null);
            return runner;
          },
          withSuccessHandler(fn: RunSuccessFn | null) {
            successFn = fn?.bind(null);
            return runner;
          },
          withUserObject(userObject: object | null) {
            stateObj = userObject;
            return runner;
          },
          ...Object.keys(mocks).reduce(
            (acc, key) => ({
              ...acc,
              [key]: (...params: any[]) => {
                mocks[key].apply(null, params).then(
                  (r: any) => {
                    successFn?.(r, stateObj ?? undefined);
                  },
                  (e: Error) => {
                    failureFn?.(e, stateObj ?? undefined);
                  }
                );
              },
            }),
            {}
          ),
        } satisfies Run;

        return runner;
      },
    },
  } satisfies ClientApi<T>;

  return window.google as ClientApi<
    T & {
      [K in keyof C]: (name: string, ...params: any[]) => void;
    }
  >;
}

/**
 * Produce a promise, resolving a given value after a specific amount of time or a random time in an interval.
 * @param millis Specific delay or range.
 * @param value Value of the resolved promise.
 * @returns Promise to be resolved.
 */
export function delayedSuccess<T>(
  millis: number | [min: number, max: number],
  value?: T
): Promise<T | undefined> {
  return new Promise<T | undefined>((resolve) => {
    setTimeout(
      () => resolve(value),
      Array.isArray(millis)
        ? Math.random() * (millis[1] - millis[0]) + millis[0]
        : millis
    );
  });
}

/**
 * Produce a promise, rejecting with a given error after a specific amount of time or a random time in an interval.
 * @param millis Specific delay or range.
 * @param error Value of the resolved promise.
 * @returns Promise to be rejected.
 */
export function delayedFailure(
  millis: number | [min: number, max: number],
  error: Error
): Promise<Error> {
  return new Promise<Error>((_, reject) => {
    setTimeout(
      () => reject(error),
      Array.isArray(millis)
        ? Math.random() * (millis[1] - millis[0]) + millis[0]
        : millis
    );
  });
}
