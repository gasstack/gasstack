import { MimeString, OnClose, OpenAs, UrlString } from "../types";
import { enumOnClose, enumOpenAs, fnName, ifDef } from "../utils";

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
  /** Text of the notification. */
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
  url: UrlString,
  openAs?: OpenAs,
  onClose?: OnClose
): GoogleAppsScript.Card_Service.OpenLink {
  const link = CardService.newOpenLink().setUrl(url);
  ifDef(openAs, (o) => link.setOpenAs(enumOpenAs(o)));
  ifDef(onClose, (c) => link.setOnClose(enumOnClose(c)));

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
  mimeType: MimeString,
  iconUrl: UrlString
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
  authUrl: UrlString
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
  authUrl: UrlString,
  uiCallback?: () => GoogleAppsScript.Card_Service.Card[]
): void {
  const exception = CardService.newAuthorizationException()
    .setResourceDisplayName(resourceName)
    .setAuthorizationUrl(authUrl);

  ifDef(uiCallback, (cb) => exception.setCustomUiCallback(fnName(cb)));

  exception.throwException();
}

/**
 * utocomplete suggestions to supplement a TextInput widget.
 * @param suggestions Text suggestions.
 * @returns Suggestions object.
 */
export function suggestions(suggestions: string[]) {
  const item = CardService.newSuggestions();

  item.addSuggestions(suggestions);

  return item;
}
