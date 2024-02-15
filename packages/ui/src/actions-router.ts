import { LoadIndicator, ResponseComponent } from "./types";
import { enumLoadIndicator, ifDef } from "./utils";

export type ActionFn<
  R extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
> = (evt: E) => R | void;

export type ActionPropType<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
> = RoutedAction<T, E> | ActionBuilder<T, E> | ActionProvider<T, E>;

export type RoutedAction<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
> = GoogleAppsScript.Card_Service.Action & {
  __actionResult: T;
  __actionParam: E;
};

export type ActionProvider<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
> = {
  (): RoutedAction<T, E>;
  __type__: "action-provider";
};

export type ActionBuilder<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
> = {
  (
    params?: { [key: string]: string },
    loadIndicator?: LoadIndicator,
    persistClientValues?: boolean
  ): ActionProvider<T, E>;
  __type__: "action-builder";
};

export type ActionRouter<T extends Record<string, ActionFn<any, any>>> = {
  [K in keyof T]: T[K] extends ActionFn<infer R, infer E>
    ? ActionBuilder<R, E>
    : never;
};

const storePropName = "GASSTACK_UI_FN_ROUTER";

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
>(config: T): ActionRouter<T> {
  const router: Record<
    string,
    ActionBuilder<ResponseComponent, GoogleAppsScript.Addons.EventObject>
  > = {};

  const globalThis = Function("return this;")();

  const actionFnStore: Record<
    string,
    ActionFn<ResponseComponent, GoogleAppsScript.Addons.EventObject>
  > = {};
  globalThis[storePropName] = actionFnStore;

  Object.keys(config).forEach((key) => {
    actionFnStore[key] = config[key].bind(null);

    router[key] = ((
      params?: { [key: string]: string },
      loadIndicator?: LoadIndicator,
      persistClientValues?: boolean
    ) => {
      const provider = () => {
        const action = CardService.newAction();
        action.setFunctionName(`${storePropName}.${key}`);
        ifDef(params, action.setParameters);
        ifDef(loadIndicator, (l) =>
          action.setLoadIndicator(enumLoadIndicator(l))
        );
        ifDef(persistClientValues, action.setPersistValues);
        return action;
      };
      provider.__type__ = "action-provider";

      return provider;
    }) as any;
    router[key].__type__ = "action-builder";
  });

  return router as ActionRouter<T>;
}
