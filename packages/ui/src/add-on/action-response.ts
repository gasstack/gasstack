import { uiFC } from "../core";

export type ActionResponseProps = {
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

export default ActionResponse;
