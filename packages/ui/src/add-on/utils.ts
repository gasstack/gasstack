export type ImageBase64 = `data:image/${string};base64,${string}`;

/**
 * Return a base64 html data string of an image stored in google Drive.
 * @param fileId Id of the Drive file.
 * @returns Base64 html data string.
 */
export function getImageBase64(fileId: string): ImageBase64 {
  const file = DriveApp.getFileById(fileId);
  const mime = file.getMimeType();
  if (mime.startsWith("image/") == false)
    throw new Error(
      `FileId: ${fileId} is not a valid image file. Its type is: ${mime}`
    );

  const data = file.getBlob().getBytes();
  return `data:${mime};base64,${Utilities.base64Encode(data)}` as ImageBase64;
}

export type UiCallback = (
  evt: GoogleAppsScript.Addons.EventObject
) =>
  | GoogleAppsScript.Card_Service.ActionResponse
  | GoogleAppsScript.Card_Service.SuggestionsResponse
  | GoogleAppsScript.Card_Service.CalendarEventActionResponse
  | GoogleAppsScript.Card_Service.DriveItemsSelectedActionResponse
  | GoogleAppsScript.Card_Service.ComposeActionResponse
  | GoogleAppsScript.Card_Service.EditorFileScopeActionResponse;

export type UiCallbackSetter = (
  action: GoogleAppsScript.Card_Service.Action
) => void;

export type UiCallbackProvider<T extends Record<string, UiCallback>> = (
  name: keyof T,
  params?: { [key: string]: string }
) => UiCallbackSetter;

const uiCallbacksStore: Record<string, UiCallback> = {};

/**
 * Configure a ui callback store to be used for scoped action executions.
 * @param config Key-Value object of named callbacks.
 * @returns Provoder function, producing scoped setters for generic actions.
 */
export function configureUiCallbacks<T extends { [key: string]: UiCallback }>(
  config: T
): UiCallbackProvider<T> {
  Object.keys(config).forEach((key) => {
    uiCallbacksStore[key] = config[key].bind(null);
  });

  return (name: string, params) => (action) => {
    action
      .setFunctionName("invokeUiCallback")
      .setParameters({ ...(params ?? {}), uiCallbackName: name });
  };
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
  if (!uiCallbacksStore[evt.commonEventObject.parameters.uiCallbackName])
    throw new Error(
      `Callback with name "${evt.commonEventObject.parameters.uiCallbackName}" not found.`
    );

  return uiCallbacksStore[evt.commonEventObject.parameters.uiCallbackName](evt);
}

/**
 * Prepare a Navigation object that controls card navigation.
 * @param steps Navigation steps (ie.: popCard, pushCard, etc.).
 * @returns Navigation object.
 */
export function navigate(
  steps: (navigation?: GoogleAppsScript.Card_Service.Navigation) => void
): GoogleAppsScript.Card_Service.Navigation {
  const nav = CardService.newNavigation();
  steps?.(nav);
  return nav;
}

/**
 * Displays a CardNotification.
 * @param text Text of the notification.
 * @returns Notification object.
 */
export function notify(
  text: string
): GoogleAppsScript.Card_Service.Notification {
  return CardService.newNotification().setText(text);
}

/**
 * Represents an action to open a link with some options.
 * @param url Sets the URL to be opened. The URL must match a prefix whitelisted in the manifest.
 * @param openAs The client can open a URL as either a full size window (if that is the frame used by the client), or an overlay (such as a pop-up). The implementation depends on the client platform capabilities, and the value selected may be ignored if the client does not support it. FULL_SIZE is supported by all clients.
 * Using OnClose may cause OpenAs to be ignored; if the client platform cannot support both selected values together, OnClose takes precedence.
 * @param onClose When a link is opened, the client either forgets about it or waits until the window is closed. The implementation depends on the client platform capabilities. OnClose may cause OpenAs to be ignored; if the client platform cannot support both selected values together, OnClose takes precedence.
 * @returns The OpenLink action.
 */
export function openLink(
  url: `https://${string}`,
  openAs?: GoogleAppsScript.Card_Service.OpenAs,
  onClose?: GoogleAppsScript.Card_Service.OnClose
): GoogleAppsScript.Card_Service.OpenLink {
  const link = CardService.newOpenLink().setUrl(url);
  if (openAs) link.setOpenAs(openAs);
  if (onClose) link.setOnClose(onClose);

  return link;
}
