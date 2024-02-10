import { ResponseFC } from "../types";
import { EmailString, ifDef } from "../utils";

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
export const ActionResponse: ResponseFC<
  GoogleAppsScript.Card_Service.ActionResponse,
  ActionResponseProps
> = (props) => {
  const builder = CardService.newActionResponseBuilder();

  ifDef(props.openLink, builder.setOpenLink);
  ifDef(props.navigation, builder.setNavigation);
  ifDef(props.notification, builder.setNotification);
  ifDef(props.stateChanged, builder.setStateChanged);

  return builder.build();
};

/**
 * The response object that may be returned from a callback method for compose action in a Gmail add-on.
 * Note: This object isn't related to compose actions that are used to extend the compose UI. Rather, this object is a response to an Action that composes draft messages when a specific UI element is selected.
 * @param props Props to build the ComposeActionResponse.
 * @returns The ComposeActionResponse object.
 */
export const ComposeActionResponse: ResponseFC<
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
export const DriveItemsSelectedActionResponse: ResponseFC<
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
export const EditorFileScopeActionResponse: ResponseFC<
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
export const SuggestionsResponse: ResponseFC<
  GoogleAppsScript.Card_Service.SuggestionsResponse,
  {
    /** List of suggestions */
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
export const UniversalActionResponse: ResponseFC<
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
export const UpdateDraftActionResponse: ResponseFC<
  GoogleAppsScript.Card_Service.UpdateDraftActionResponse,
  {
    /** Updates the To recipients of an email draft. */
    to?: EmailString[];
    /** Updates the Cc recipients of an email draft. */
    cc?: EmailString[];
    /** Updates the Bcc recipients of an email draft. */
    bcc?: EmailString[];
    /** Updates the subject line to insert to the email draft. */
    subject?: string;
    /** Updates the body of of an email draft. */
    body?: {
      /** The content to insert to the email draft. */
      content: string;
      /** The content type of the content to be inserted. */
      contentType: GoogleAppsScript.Card_Service.ContentType;
      /** The type of update to be performed on an email draft. */
      updateType?: GoogleAppsScript.Card_Service.UpdateDraftBodyType;
    };
  }
> = (props) => {
  const item = CardService.newUpdateDraftActionResponseBuilder();

  ifDef(props.to, (to) =>
    item.setUpdateDraftToRecipientsAction(
      CardService.newUpdateDraftToRecipientsAction().addUpdateToRecipients(to)
    )
  );
  ifDef(props.cc, (cc) =>
    item.setUpdateDraftCcRecipientsAction(
      CardService.newUpdateDraftCcRecipientsAction().addUpdateCcRecipients(cc)
    )
  );
  ifDef(props.bcc, (bcc) =>
    item.setUpdateDraftBccRecipientsAction(
      CardService.newUpdateDraftBccRecipientsAction().addUpdateBccRecipients(
        bcc
      )
    )
  );
  ifDef(props.subject, (subject) =>
    item.setUpdateDraftSubjectAction(
      CardService.newUpdateDraftSubjectAction().addUpdateSubject(subject)
    )
  );
  ifDef(props.body, (body) => {
    const res = CardService.newUpdateDraftBodyAction().addUpdateContent(
      body.content,
      body.contentType
    );

    ifDef(body.updateType, res.setUpdateType);
    item.setUpdateDraftBodyAction(res);
  });

  return item.build();
};

export type CalendarEventActionResponseProps = {
  /** Specifies that the response should add the attachments to the Calendar event when the associated UI action is taken. */
  attachments?: GoogleAppsScript.Card_Service.Attachment[];
  /** Specifies that the response should add the indicated attendees (emails) to the Calendar event when the associated UI action is taken. */
  attendees?: EmailString[];
  /** Specifies that the response should set the indicated conference data to the Calendar event when the associated UI action is taken. */
  conferenceData?: GoogleAppsScript.Conference_Data.ConferenceData;
};

/**
 * Creates a CalendarEventActionResponse object.
 * @param props Props to build the CalendarEventActionResponse.
 * @returns CalendarEventActionResponse object.
 */
export const CalendarEventActionResponse: ResponseFC<
  GoogleAppsScript.Card_Service.CalendarEventActionResponse,
  CalendarEventActionResponseProps
> = (props) => {
  const builder = CardService.newCalendarEventActionResponseBuilder();

  ifDef(props.attachments, builder.addAttachments);
  ifDef(props.attendees, builder.addAttendees);
  ifDef(props.conferenceData, builder.setConferenceData);

  return builder.build();
};
