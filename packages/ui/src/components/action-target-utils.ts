import { ActionTarget } from "../types";
import { RoutedAction } from "./action";

//TODO: use in each actiontarget props
export type ActionTargetProps = {
  action:
    | {
        /** Sets an authorization action that opens a URL to the authorization flow when the object is clicked. This opens the URL in a new window. When the user finishes the authorization flow and returns to the application, the add-on reloads. */
        authorize: string;
      }
    | {
        /**
         * Sets an action that composes a draft email when the object is clicked.
         * This method doesn't set a compose action that is used to extend the compose UI. Rather, this method connects this UI element to an Action that composes draft messages in Apps Script that are opened in Gmail when the action completes.
         */
        compose: {
          /** The Action parameter must specify a callback function that returns a ComposeActionResponse object configured using ComposeActionResponseBuilder.setGmailDraft(draft). */
          action: RoutedAction<GoogleAppsScript.Card_Service.ComposeActionResponse>;
          /** An enum value that specifies whether the composed email is a standalone or reply draft. */
          type: GoogleAppsScript.Card_Service.ComposedEmailType;
        };
      }
    | {
        /** Sets an action that executes when the object is clicked. */
        click: RoutedAction<GoogleAppsScript.Card_Service.ActionResponse>;
      }
    | {
        /**
         * Sets an action that opens a URL in a tab when the object is clicked. It is possible both to use url and an action if side effects are needed in addition to the opening of the url.
         * Url to open or UiAction that must specify a callback function that returns a ActionResponse object configured using ActionResponseBuilder.setOpenLink(openLink).
         */
        openLink:
          | RoutedAction<GoogleAppsScript.Card_Service.ActionResponse>
          | GoogleAppsScript.Card_Service.OpenLink;
      };
};

//TODO: use in each actiontarget
export function withAction<T extends ActionTarget>(
  target: T,
  props: ActionTargetProps
): T {
  if ("authorize" in props.action) {
    target.setAuthorizationAction(
      CardService.newAuthorizationAction().setAuthorizationUrl(
        props.action.authorize
      )
    );
  } else if ("compose" in props.action) {
    target.setComposeAction(
      props.action.compose.action,
      props.action.compose.type
    );
  } else if ("click" in props.action) {
    target.setOnClickAction(props.action.click);
  } else if ("openLink" in props.action) {
    if ("setUrl" in props.action.openLink)
      target.setOpenLink(props.action.openLink);
    else target.setOnClickOpenLinkAction(props.action.openLink);
  }

  return target;
}
