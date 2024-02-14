import { ResponseComponent } from "./types";

export type ActionFn<
  R extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
> = (evt: E) => R | void;

export type ActionBuilder<T extends ResponseComponent> = (
  action: GoogleAppsScript.Card_Service.Action,
  params?: { [key: string]: string }
) => void & T;

export type ActionProvider<T extends Record<string, ActionFn<any, any>>> = {
  [K in keyof T]: T[K] extends ActionFn<infer R, infer E>
    ? ActionBuilder<R>
    : never;
};

//TODO: change using globalThis or global const gasstack_ui_{name}
const actionFnStore: Record<string, ActionFn<any, any>> = {};
const ACTION_FN_PARAM_NAME = "routedFunction";

/**
 * Creates andconfigures a router to set and execute managed actions.
 * @param config Key-Value object of named action functions.
 * @returns Provider function, producing scoped setters for generic actions.
 */
export function createActionRouter<
  T extends {
    [key: string]: ActionFn<
      ResponseComponent,
      GoogleAppsScript.Addons.EventObject
    >;
  }
>(config: T): ActionProvider<T> {
  const provider: Record<string, ActionBuilder<any>> = {};

  Object.keys(config).forEach((key) => {
    actionFnStore[key] = config[key].bind(null);

    provider[key] = ((
      action: GoogleAppsScript.Card_Service.Action,
      params?: { [key: string]: string }
    ) => {
      action
        .setFunctionName(invokeActionFn.name)
        .setParameters({ ...(params ?? {}), [ACTION_FN_PARAM_NAME]: key });
    }) satisfies ActionBuilder<any>;
  });

  return provider as ActionProvider<T>;
}

/**
 * Invokes a managed action function.
 * @param evt Google App Script addon EventObject.
 * @returns Result of the invoked function.
 */
export function invokeActionFn(evt: GoogleAppsScript.Addons.EventObject) {
  const routeFn = evt.commonEventObject.parameters[ACTION_FN_PARAM_NAME];
  if (!routeFn)
    throw new Error(
      `In order to invoke a managed function the parameter "${ACTION_FN_PARAM_NAME}" must be provided.`
    );
  if (!actionFnStore[routeFn])
    throw new Error(`Managed function with name "${routeFn}" not found.`);

  return actionFnStore[routeFn](evt);
}
