import { fnName } from "./utils";

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

/**
 * Represents an attachment created by an add-on. This can be used within the context of different Google extensibility products to generate new attachments, such as for Calendar events.
 * @param url Sets the resource URL for the attachment.
 * @param title Sets the title for the attachment.
 * @param mimeType Sets the MIME type for the attachment.
 * @param iconUrl Sets the icon URL for the attachment.
 * @returns Attachment object.
 */
export function attachment(
  url: string,
  title: string,
  mimeType: `${string}/${string}`,
  iconUrl: `https://${string}`
): GoogleAppsScript.Card_Service.Attachment {
  return CardService.newAttachment()
    .setResourceUrl(url)
    .setTitle(title)
    .setMimeType(mimeType)
    .setIconUrl(iconUrl);
}

/**
 * An authorization action that will send the user to the AuthorizationUrl when clicked.
 * @param authUrl Sets the authorization URL that user is taken to from the authorization prompt.
 * @returns Authorization object.
 */
export function authorize(
  authUrl: `https://${string}`
): GoogleAppsScript.Card_Service.AuthorizationAction {
  return CardService.newAuthorizationAction().setAuthorizationUrl(authUrl);
}

/**
 * An error that can be returned to trigger an authorization card to be shown to the user.
 * @param resourceName Sets the name that is displayed to the user when asking for authorization.
 * @param authUrl Sets the authorization URL that user is taken to from the authorization prompt.
 * @param uiCallback The name of a function to call to generate a custom authorization prompt.
 */
export function requestAuthorization(
  resourceName: string,
  authUrl: `https://${string}`,
  uiCallback?: () => GoogleAppsScript.Card_Service.Card[]
): void {
  const exception = CardService.newAuthorizationException()
    .setResourceDisplayName(resourceName)
    .setAuthorizationUrl(authUrl);

  if (uiCallback) exception.setCustomUiCallback(fnName(uiCallback));

  exception.throwException();
}

/**
 * A class that represents a complete border style that can be applied to widgets.
 * @param color The color in #RGB format to be applied to the border.
 * @param radius The corner radius to be applied to the border.
 * @param type Sets the type of the border.
 * @returns Border object.
 */
export function border(
  color: `#${string}`,
  radius?: number,
  type?: GoogleAppsScript.Card_Service.BorderType
) {
  const item = CardService.newBorderStyle();

  if (radius !== undefined) item.setCornerRadius(radius);
  if (color) item.setStrokeColor(color);
  if (type) item.setType(type);

  return item;
}