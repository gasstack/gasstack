import { uiFC } from "../core";

export type CardProps = {
  /** Sets the name for this card. The name can be used for navigation. */
  name?: string;
  /**
   * Sets the display style for this card.
   * If the display style is set to DisplayStyle.REPLACE, the card is shown by replacing the view of top card in the card stack.
   * If the display style is set to DisplayStyle.PEEK, the header of the card appears at the bottom of the sidebar, partially covering the current top card of the stack. Clicking the header pops the card into the card stack. If the card has no header, a generated header is used instead.
   * DisplayStyle only works for card returned from contextual trigger function.
   */
  displayStyle?: GoogleAppsScript.Card_Service.DisplayStyle;
  /** Sets a fixed footer for this card. */
  fixedFooter?: GoogleAppsScript.Card_Service.FixedFooter;
  /** Sets the header for this card. */
  header?: GoogleAppsScript.Card_Service.CardHeader;
  /** Sets the peek card header.
   * The peek card is set on the first card returned from a contextual trigger function. It is used as a descriptive placeholder widget so that users can navigate from a homepage stack to the contextual stack.
   */
  peekHeader?: GoogleAppsScript.Card_Service.CardHeader;
  /** Adds a CardAction to this Card. */
  actions?: GoogleAppsScript.Card_Service.CardAction[];
  /** Adds a section to this card. You can't add more than 100 sections to a card. */
  sections?: GoogleAppsScript.Card_Service.CardSection[];
};

/**
 * Creates a Card object.
 * @param props Props to build the Card.
 * @returns Card object.
 */
export const Card: uiFC<GoogleAppsScript.Card_Service.Card, CardProps> = (
  props
) => {
  const builder = CardService.newCardBuilder();

  if (props.name) builder.setName(props.name);
  if (props.displayStyle) builder.setDisplayStyle(props.displayStyle);

  if (props.fixedFooter) builder.setFixedFooter(props.fixedFooter);
  if (props.header) builder.setHeader(props.header);
  if (props.peekHeader) builder.setPeekCardHeader(props.peekHeader);

  if (props.sections) props.sections.forEach((p) => builder.addSection(p));
  if (props.actions) props.actions.forEach((p) => builder.addCardAction(p));

  return builder.build();
};
