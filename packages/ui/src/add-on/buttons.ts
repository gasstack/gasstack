import { UiAction } from "./action";
import { uiFC } from "../core";

export type ButtonVariants =
  | GoogleAppsScript.Card_Service.Button
  | GoogleAppsScript.Card_Service.CardAction
  | GoogleAppsScript.Card_Service.DecoratedText
  | GoogleAppsScript.Card_Service.Grid
  | GoogleAppsScript.Card_Service.Image
  | GoogleAppsScript.Card_Service.ImageButton;

/**
 * Sets an authorization action that opens a URL to the authorization flow when the object is clicked. This opens the URL in a new window. When the user finishes the authorization flow and returns to the application, the add-on reloads.
 * @param btn Button to be decorated.
 * @param action The object that specifies the authorization action to take when this element is clicked.
 * @returns The decorated Button.
 */
export function Authorize<T extends ButtonVariants>(
  btn: T,
  action: GoogleAppsScript.Card_Service.AuthorizationAction
): T {
  btn.setAuthorizationAction(action);
  return btn;
}

/**
 * Sets an action that composes a draft email when the object is clicked.
 * This method doesn't set a compose action that is used to extend the compose UI. Rather, this method connects this UI element to an Action that composes draft messages in Apps Script that are opened in Gmail when the action completes.
 * @param btn Button to be decorated.
 * @param action The Action parameter must specify a callback function that returns a ComposeActionResponse object configured using ComposeActionResponseBuilder.setGmailDraft(draft).
 * @param type An enum value that specifies whether the composed email is a standalone or reply draft.
 * @returns The decorated Button.
 */
export function Compose<T extends ButtonVariants>(
  btn: T,
  action: UiAction<GoogleAppsScript.Card_Service.ComposeActionResponse>,
  type: GoogleAppsScript.Card_Service.ComposedEmailType
): T {
  btn.setComposeAction(action, type);
  return btn;
}

/**
 * Sets an action that executes when the object is clicked.
 * @param btn Button to be decorated.
 * @param action The action to take when this element is clicked.
 * @returns The decorated Button.
 */
export function OnClick<T extends ButtonVariants>(
  btn: T,
  action: UiAction<GoogleAppsScript.Card_Service.ActionResponse>
): T {
  btn.setOnClickAction(action);
  return btn;
}

/**
 * Sets an action that opens a URL in a tab when the object is clicked. It is possible both to use url and an action if side effects are needed in addition to the opening of the url.
 * @param btn Button to be decorated.
 * @param action Url to open or UiAction that must specify a callback function that returns a ActionResponse object configured using ActionResponseBuilder.setOpenLink(openLink).
 * @returns The decorated Button.
 */
export function OpenLink<T extends ButtonVariants>(
  btn: T,
  action:
    | UiAction<GoogleAppsScript.Card_Service.ActionResponse>
    | GoogleAppsScript.Card_Service.OpenLink
): T {
  if ("setUrl" in action) btn.setOpenLink(action);
  else btn.setOnClickOpenLinkAction(action);
  return btn;
}

/**
 * Holds a set of Button objects that are displayed in a row.
 * @param buttons Set of Buttons.
 * @returns ButtonSet object.
 */
export const ButtonSet: uiFC<
  GoogleAppsScript.Card_Service.ButtonSet,
  GoogleAppsScript.Card_Service.Button[]
> = (buttons) => {
  const set = CardService.newButtonSet();

  buttons.forEach((btn) => set.addButton(btn));

  return set;
};

export type CardActionProps = {
  /** Sets the menu text for this action. */
  text: string;
};

/**
 * A clickable menu item that is added to the card header menu.
 * @param props CardAction options.
 * @returns CardAction object.
 */
export const CardAction: uiFC<
  GoogleAppsScript.Card_Service.CardAction,
  CardActionProps
> = (props) => {
  return CardService.newCardAction().setText(props.text);
};

/**
 * Updates the To recipients of an email draft.
 * @param props Action options.
 * @returns Action object.
 */
export const updateTo: uiFC<
  GoogleAppsScript.Card_Service.UpdateDraftToRecipientsAction,
  {
    emails: `${string}@${string}.${string}`[];
  }
> = (props) => {
  return CardService.newUpdateDraftToRecipientsAction().addUpdateToRecipients(
    props.emails
  );
};

/**
 * Updates the Cc recipients of an email draft.
 * @param props Action options.
 * @returns Action object.
 */
export const updateCc: uiFC<
  GoogleAppsScript.Card_Service.UpdateDraftCcRecipientsAction,
  {
    emails: `${string}@${string}.${string}`[];
  }
> = (props) => {
  return CardService.newUpdateDraftCcRecipientsAction().addUpdateCcRecipients(
    props.emails
  );
};

/**
 * Updates the Bcc recipients of an email draft.
 * @param props Action options.
 * @returns Action object.
 */
export const updateBcc: uiFC<
  GoogleAppsScript.Card_Service.UpdateDraftBccRecipientsAction,
  {
    emails: `${string}@${string}.${string}`[];
  }
> = (props) => {
  return CardService.newUpdateDraftBccRecipientsAction().addUpdateBccRecipients(
    props.emails
  );
};

/**
 * Updates the subject line of an email draft.
 * @param props Action options.
 * @returns Action object.
 */
export const updateSubject: uiFC<
  GoogleAppsScript.Card_Service.UpdateDraftSubjectAction,
  {
    /** The subject line to insert to the email draft. */
    subject: string;
  }
> = (props) => {
  return CardService.newUpdateDraftSubjectAction().addUpdateSubject(
    props.subject
  );
};

/**
 * Updates the email draft body.
 * @param props Action options.
 * @returns Action object.
 */
export const updateBody: uiFC<
  GoogleAppsScript.Card_Service.UpdateDraftBodyAction,
  {
    /** The content to insert to the email draft. */
    content: string;
    /** The content type of the content to be inserted. */
    contentType: GoogleAppsScript.Card_Service.ContentType;
    /** The type of update to be performed on an email draft. */
    updateType: GoogleAppsScript.Card_Service.UpdateDraftBodyType;
  }
> = (props) => {
  const item = CardService.newUpdateDraftBodyAction().addUpdateContent(
    props.content,
    props.contentType
  );

  if (props.updateType) item.setUpdateType(props.updateType);

  return item;
};
