import { uiFC } from "../core";

export type CalendarEventActionResponseProps = {
  /** Specifies that the response should add the attachments to the Calendar event when the associated UI action is taken. */
  attachments?: GoogleAppsScript.Card_Service.Attachment[];
  /** Specifies that the response should add the indicated attendees (emails) to the Calendar event when the associated UI action is taken. */
  attendees?: `${string}@${string}.${string}`[];
  /** Specifies that the response should set the indicated conference data to the Calendar event when the associated UI action is taken. */
  conferenceData?: GoogleAppsScript.Conference_Data.ConferenceData;
};

/**
 * Creates a CalendarEventActionResponse object.
 * @param props Props to build the CalendarEventActionResponse.
 * @returns CalendarEventActionResponse object.
 */
export const CalendarEventActionResponse: uiFC<
  GoogleAppsScript.Card_Service.CalendarEventActionResponse,
  CalendarEventActionResponseProps
> = (props) => {
  const builder = CardService.newCalendarEventActionResponseBuilder();

  if (props.attachments) builder.addAttachments(props.attachments);
  if (props.attendees) builder.addAttendees(props.attendees);
  if (props.conferenceData) builder.setConferenceData(props.conferenceData);

  return builder.build();
};
