export type ActionResponseTypes =
  | GoogleAppsScript.Card_Service.ActionResponse
  | GoogleAppsScript.Card_Service.SuggestionsResponse
  | GoogleAppsScript.Card_Service.CalendarEventActionResponse
  | GoogleAppsScript.Card_Service.DriveItemsSelectedActionResponse
  | GoogleAppsScript.Card_Service.ComposeActionResponse
  | GoogleAppsScript.Card_Service.EditorFileScopeActionResponse
  | GoogleAppsScript.Card_Service.UpdateDraftToRecipientsAction
  | GoogleAppsScript.Card_Service.UpdateDraftCcRecipientsAction
  | GoogleAppsScript.Card_Service.UpdateDraftBccRecipientsAction
  | GoogleAppsScript.Card_Service.UpdateDraftSubjectAction
  | GoogleAppsScript.Card_Service.UpdateDraftBodyAction;

export type UiCallbackFn<R extends ActionResponseTypes> = (
  evt: GoogleAppsScript.Addons.EventObject
) => R;

export type UiCallbackSetterResult<T extends ActionResponseTypes> = void & T;

export type UiCallbackSetter<T extends ActionResponseTypes> = (
  action: GoogleAppsScript.Card_Service.Action,
  params?: { [key: string]: string }
) => UiCallbackSetterResult<T>;

export type UiCallbackProvider<T extends Record<string, UiCallbackFn<any>>> = {
  [K in keyof T]: T[K] extends UiCallbackFn<infer R>
    ? UiCallbackSetter<R>
    : never;
};

const uiCallbackStore: Record<string, UiCallbackFn<any>> = {};

/**
 * Configure a ui callback store to be used for scoped action executions.
 * @param config Key-Value object of named callbacks.
 * @returns Provoder function, producing scoped setters for generic actions.
 */
export function initUiCallbacks<T extends { [key: string]: UiCallbackFn<any> }>(
  config: T
): UiCallbackProvider<T> {
  const result: object = {};

  Object.keys(config).forEach((key) => {
    uiCallbackStore[key] = config[key].bind(null);

    result[key] = ((
      action: GoogleAppsScript.Card_Service.Action,
      params?: { [key: string]: string }
    ) => {
      action
        .setFunctionName("invokeUiCallback")
        .setParameters({ ...(params ?? {}), uiCallbackName: key });
    }) satisfies UiCallbackSetter<any>;
  });

  return result as UiCallbackProvider<T>;
}

/**
 * Invokes a scoped ui callback.
 * @param evt Google App Script addon EventObject.
 * @returns Result of the invoked callback.
 */
export function invokeUiCallback(evt: GoogleAppsScript.Addons.EventObject) {
  if (!evt.commonEventObject.parameters.uiCallbackName)
    throw new Error(
      `In order to invoke a UI callback the parameter "uiCallbackName" must be provided.`
    );
  if (!uiCallbackStore[evt.commonEventObject.parameters.uiCallbackName])
    throw new Error(
      `Callback with name "${evt.commonEventObject.parameters.uiCallbackName}" not found.`
    );

  return uiCallbackStore[evt.commonEventObject.parameters.uiCallbackName](evt);
}
