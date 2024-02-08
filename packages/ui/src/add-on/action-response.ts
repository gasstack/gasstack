import { UiAction } from ".";
import { uiFC } from "../core";

type ActionResponseBase = {
  /**
   * Action to open a link with some options.
   */
  openLink?: GoogleAppsScript.Card_Service.OpenLink;
  /**
   * Navigation object that controls card navigation.
   */
  navigation?: GoogleAppsScript.Card_Service.Navigation;
  /**
   * Displays a CardNotification.
   */
  notification?: GoogleAppsScript.Card_Service.Notification;
  /**
   * Sets a flag to indicate that this action changed the existing data state. For example, if the action created a task or updated contact information. When this flag is set to true, services such as Gmail can attempt to clear any cached state data associated with this action.
   */
  stateChanged?: boolean;
};
export type ActionResponseProps = ActionResponseBase &
  (
    | {
        /**
         * Action to open a link with some options.
         */
        openLink: GoogleAppsScript.Card_Service.OpenLink;
      }
    | {
        /**
         * Navigation object that controls card navigation.
         */
        navigation: GoogleAppsScript.Card_Service.Navigation;
      }
    | {
        /**
         * Displays a CardNotification.
         */
        notification: GoogleAppsScript.Card_Service.Notification;
      }
  );

/**
 * Creates a ActionResponse object.
 * @param props Props to build the ActionResponse.
 * @returns ActionResponse object.
 */
export const ActionResponse: uiFC<
  GoogleAppsScript.Card_Service.ActionResponse,
  ActionResponseProps
> = (props) => {
  const builder = CardService.newActionResponseBuilder();

  if (props.openLink) builder.setOpenLink(props.openLink);
  if (props.navigation) builder.setNavigation(props.navigation);
  if (props.notification) builder.setNotification(props.notification);
  if (props.stateChanged !== undefined)
    builder.setStateChanged(props.stateChanged);

  return builder.build();
};

/**
 * The response object that may be returned from a callback method for compose action in a Gmail add-on.
 * Note: This object isn't related to compose actions that are used to extend the compose UI. Rather, this object is a response to an Action that composes draft messages when a specific UI element is selected.
 * @param props Props to build the ComposeActionResponse.
 * @returns The ComposeActionResponse object.
 */
export const ComposeActionResponse: uiFC<
  GoogleAppsScript.Card_Service.ComposeActionResponse,
  {
    /** The draft GmailMessage created using GmailMessage.createDraftReply(body) or similar functions. */
    draft: GoogleAppsScript.Gmail.GmailDraft;
  }
> = (props) => {
  return CardService.newComposeActionResponseBuilder()
    .setGmailDraft(props.draft)
    .build();
};

/**
 * Represents a response that makes changes to Drive while Drive items are selected and in reaction to an action taken in the UI, such as a button click.
 * @param props Props to build the response object.
 * @returns Response object.
 */
export const DriveItemsSelectedActionResponse: uiFC<
  GoogleAppsScript.Card_Service.DriveItemsSelectedActionResponse,
  {
    /** ID of the Drive item to request file scope for. */
    itemId: string;
  }
> = (props) => {
  return CardService.newDriveItemsSelectedActionResponseBuilder()
    .requestFileScope(props.itemId)
    .build();
};

/**
 * Makes changes to an Editor, such as Google Docs, Sheets, or Slides in reaction to an action taken in the UI. For example a request for drive.file scope for the current active document.
 * @param props Props to build the response object.
 * @returns Response object.
 */
export const EditorFileScopeActionResponse: uiFC<
  GoogleAppsScript.Card_Service.EditorFileScopeActionResponse,
  void
> = () => {
  return CardService.newEditorFileScopeActionResponseBuilder()
    .requestFileScopeForActiveDocument()
    .build();
};

/**
 * A response object that can be returned from a suggestions callback function. This is used with TextInput widgets that implement autocomplete.
 * @param props Props to build the response object.
 * @returns Response object.
 */
export const SuggestionsResponse: uiFC<
  GoogleAppsScript.Card_Service.SuggestionsResponse,
  {
    suggestions: string[];
  }
> = (props) => {
  return CardService.newSuggestionsResponseBuilder()
    .setSuggestions(
      CardService.newSuggestions().addSuggestions(props.suggestions)
    )
    .build();
};

/**
 * The response object that may be returned from a method that creates universal action.
 * @param props Props to build the UniversalActionResponse.
 * @returns UniversalActionResponse object.
 */
export const UniversalActionResponse: uiFC<
  GoogleAppsScript.Card_Service.UniversalActionResponse,
  {
    /** Displays the add-on with the specified cards or sets the URL to open when the universal action is selected. */
    action:
      | GoogleAppsScript.Card_Service.OpenLink
      | GoogleAppsScript.Card_Service.Card[];
  }
> = (props) => {
  const item = CardService.newUniversalActionResponseBuilder();

  if ("setUrl" in props.action) item.setOpenLink(props.action);
  else item.displayAddOnCards(props.action);

  return item.build();
};

/**
 * Represents an action that updates the email draft that the user is currently editing.
 * @param props Props to build the UpdateDraftActionResponse.
 * @returns UpdateDraftActionResponse object.
 */
export const UpdateDraftActionResponse: uiFC<
  GoogleAppsScript.Card_Service.UpdateDraftActionResponse,
  {
    /** Sets an action that updates the email Bcc recipients of a draft. */
    to?: UiAction<GoogleAppsScript.Card_Service.UpdateDraftToRecipientsAction>;
    /** Set an action that updates the email body of a draft. */
    cc?: UiAction<GoogleAppsScript.Card_Service.UpdateDraftCcRecipientsAction>;
    /** Sets an action that updates the Cc recipients of a draft. */
    bcc?: UiAction<GoogleAppsScript.Card_Service.UpdateDraftBccRecipientsAction>;
    /** Sets an action that updates the subject line of a draft. */
    subject?: UiAction<GoogleAppsScript.Card_Service.UpdateDraftSubjectAction>;
    /** Sets an action that updates the To recipients of a draft. */
    body?: UiAction<GoogleAppsScript.Card_Service.UpdateDraftBodyAction>;
  }
> = (props) => {
  const item = CardService.newUpdateDraftActionResponseBuilder();

  if (props.to) item.setUpdateDraftToRecipientsAction(props.to);
  if (props.cc) item.setUpdateDraftCcRecipientsAction(props.cc);
  if (props.bcc) item.setUpdateDraftBccRecipientsAction(props.bcc);
  if (props.subject) item.setUpdateDraftSubjectAction(props.subject);
  if (props.body) item.setUpdateDraftBodyAction(props.body);

  return item.build();
};
