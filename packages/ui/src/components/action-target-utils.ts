import { ActionPropType } from "../actions-router";
import { ActionTarget, ComposedEmailType } from "../types";
import { buildAction, enumComposedEmailType } from "../utils";

export type ActionTargetProps = {
  /** Sets an action that executes when the object is clicked. */
  onClick:
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
          action: ActionPropType<
            GoogleAppsScript.Card_Service.ComposeActionResponse,
            GoogleAppsScript.Addons.EventObject
          >;
          /** An enum value that specifies whether the composed email is a standalone or reply draft. */
          type: ComposedEmailType;
        };
      }
    | ActionPropType<
        GoogleAppsScript.Card_Service.ActionResponse,
        GoogleAppsScript.Addons.EventObject
      >
    | {
        /**
         * Sets an action that opens a URL in a tab when the object is clicked. It is possible both to use url and an action if side effects are needed in addition to the opening of the url.
         * Url to open or UiAction that must specify a callback function that returns a ActionResponse object configured using ActionResponseBuilder.setOpenLink(openLink).
         */
        openLink:
          | ActionPropType<
              GoogleAppsScript.Card_Service.ActionResponse,
              GoogleAppsScript.Addons.EventObject
            >
          | GoogleAppsScript.Card_Service.OpenLink;
      };
};

export function withAction<T extends ActionTarget>(
  target: T,
  props: ActionTargetProps
): T {
  if (
    typeof props.onClick === "function" ||
    "setFunctionName" in props.onClick
  ) {
    target.setOnClickAction(buildAction(props.onClick));
  } else if ("authorize" in props.onClick) {
    target.setAuthorizationAction(
      CardService.newAuthorizationAction().setAuthorizationUrl(
        props.onClick.authorize
      )
    );
  } else if ("compose" in props.onClick) {
    target.setComposeAction(
      buildAction(props.onClick.compose.action),
      enumComposedEmailType(props.onClick.compose.type)
    );
  } else if ("openLink" in props.onClick) {
    if ("setUrl" in props.onClick.openLink)
      target.setOpenLink(props.onClick.openLink);
    else target.setOnClickOpenLinkAction(buildAction(props.onClick.openLink));
  }

  return target;
}
