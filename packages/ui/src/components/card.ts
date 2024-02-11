import { ActionFC, FC, ImageBase64, UrlString } from "../types";
import { ifDef } from "../utils";
import { ActionTargetProps, withAction } from "./action-target-utils";

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
export const Card: FC<GoogleAppsScript.Card_Service.Card, CardProps> = (
  props
) => {
  const builder = CardService.newCardBuilder();

  ifDef(props.name, builder.setName);
  ifDef(props.displayStyle, builder.setDisplayStyle);

  ifDef(props.fixedFooter, builder.setFixedFooter);
  ifDef(props.header, builder.setHeader);
  ifDef(props.peekHeader, builder.setPeekCardHeader);

  ifDef(props.sections, (s) => s.forEach((p) => builder.addSection(p)));
  ifDef(props.actions, (a) => a.forEach((p) => builder.addCardAction(p)));

  return builder.build();
};

/**
 * A clickable menu item that is added to the card header menu.
 * @param props CardAction options.
 * @returns CardAction object.
 */
export const CardAction: ActionFC<
  GoogleAppsScript.Card_Service.CardAction,
  {
    /** Sets the menu text for this action. */
    text: string;
  } & ActionTargetProps
> = (props) => {
  const item = CardService.newCardAction().setText(props.text);

  withAction(item, props);

  return item;
};

export type CardSectionProps = {
  /** Sets the header of the section. */
  header?: string;
  /** Sets whether the section can be collapsed. */
  collabsible?: boolean;
  /**
   * Sets the number of widgets that are still shown when this section is collapsed. The widgets shown are always the first ones that were added.
   */
  collapsibleCount?: number;
  /**
   * Adds the given widget to this section. Widgets are shown in the order they were added. You can't add more than 100 widgets to a card section.
   */
  widgets?: GoogleAppsScript.Card_Service.Widget[];
};

/**
 * Creates a CardSection object.
 * @param props Props to build the CardSection.
 * @returns CardSection object.
 */
export const CardSection: FC<
  GoogleAppsScript.Card_Service.CardSection,
  CardSectionProps
> = (props) => {
  const cmp = CardService.newCardSection();

  ifDef(props.collabsible, cmp.setCollapsible);
  ifDef(props.header, cmp.setHeader);
  ifDef(props.collapsibleCount, cmp.setNumUncollapsibleWidgets);

  ifDef(props.widgets, (w) => w.forEach((p) => cmp.addWidget(p)));

  return cmp;
};

export type CardHeaderProps = {
  /** Sets the title of the card header. */
  title: string;
  /** Sets the subtitle of the card header. */
  subtitle?: string;
  /**
   * Sets the image to use in the header by providing its URL or data string.
   * The provided URL can either be a publicly accessible URL or a base64 encoded image string.
   */
  imageUrl?: UrlString | ImageBase64;
  /** Sets the alternative text for the header image. */
  imageAltText?: string;
  /** Sets the cropping of the icon in the card header. Defaults to no crop. */
  imageStyle?: GoogleAppsScript.Card_Service.ImageStyle;
};

/**
 * Creates a CardHeader object.
 * @param props Props to build the CardHeader.
 * @returns CardHeader object.
 */
export const CardHeader: FC<
  GoogleAppsScript.Card_Service.CardHeader,
  CardHeaderProps
> = (props) => {
  const cmp = CardService.newCardHeader();

  ifDef(props.title, cmp.setTitle);
  ifDef(props.subtitle, cmp.setSubtitle);
  ifDef(props.imageUrl, cmp.setImageUrl);
  ifDef(props.imageStyle, cmp.setImageStyle);
  ifDef(props.imageAltText, cmp.setImageAltText);

  return cmp;
};

/**
 * A horizontal divider.
 * @returns The Divider object.
 */
export const Divider: FC<GoogleAppsScript.Card_Service.Divider, void> = () => {
  return CardService.newDivider();
};
