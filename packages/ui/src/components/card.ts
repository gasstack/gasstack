import {
  ActionFC,
  CardPeekHeaderType,
  DisplayStyle,
  FC,
  ImageBase64,
  ImageStyle,
  UrlString,
} from "../types";
import { enumDisplayStyle, enumImageStyle, getArray, ifDef } from "../utils";
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
  displayStyle?: DisplayStyle;
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

  children?: CardPropsChildren | CardPropsChildren[];
};

export type CardPropsChildren =
  | GoogleAppsScript.Card_Service.CardHeader
  | CardPeekHeaderType
  | GoogleAppsScript.Card_Service.FixedFooter
  | { sections: GoogleAppsScript.Card_Service.CardSection[] }
  | { actions: GoogleAppsScript.Card_Service.CardAction[] };

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
  ifDef(props.displayStyle, (s) =>
    builder.setDisplayStyle(enumDisplayStyle(s))
  );

  ifDef(props.fixedFooter, builder.setFixedFooter, () => {
    const footer = getArray(props.children).find((p) => "setPrimaryButton");
    if (footer && "setPrimaryButton" in footer) builder.setFixedFooter(footer);
  });
  ifDef(props.header, builder.setHeader, () => {
    const header = getArray(props.children).find(
      (p) => "setSubtitle" in p && "role" in p === false
    );
    if (header && "setSubtitle" in header) builder.setHeader(header);
  });
  ifDef(props.peekHeader, builder.setPeekCardHeader, () => {
    const header = getArray(props.children).find(
      (p) => "setSubtitle" in p && "role" in p && p.role === "peekHeader"
    );
    if (header && "setSubtitle" in header) builder.setPeekCardHeader(header);
  });

  ifDef(props.sections, (s) => s.forEach((p) => builder.addSection(p)));
  ifDef(props.actions, (a) => a.forEach((p) => builder.addCardAction(p)));

  const s = getArray(props.children).find((p) => "sections" in p);
  if (!!s && "sections" in s) {
    s.sections.forEach((p) => builder.addSection(p));
  }

  const a = getArray(props.children).find((p) => "actions" in p);
  if (!!a && "actions" in a) {
    a.actions.forEach((p) => builder.addCardAction(p));
  }

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

  children?: GoogleAppsScript.Card_Service.Widget[];
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

  ifDef(getArray(props.children), (w) => w.forEach((p) => cmp.addWidget(p)));

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
  imageStyle?: ImageStyle;
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
  ifDef(props.imageStyle, (s) => cmp.setImageStyle(enumImageStyle(s)));
  ifDef(props.imageAltText, cmp.setImageAltText);

  return cmp;
};

/**
 * The peek card is set on the first card returned from a contextual trigger function. It is used as a descriptive placeholder widget so that users can navigate from a homepage stack to the contextual stack.
 * @param props Props to build the CardHeader.
 * @returns CardHeader object.
 */
export const PeekCardHeader: FC<CardPeekHeaderType, CardHeaderProps> = (
  props
) => {
  const result = CardHeader(props) as CardPeekHeaderType;
  result.role = "peekHeader";
  return result;
};

/**
 * A horizontal divider.
 * @returns The Divider object.
 */
export const Divider: FC<GoogleAppsScript.Card_Service.Divider, void> = () => {
  return CardService.newDivider();
};

/**
 * Groups CardActions of a Card.
 * @param props
 * @returns
 */
export const CardActions: FC<
  { actions: GoogleAppsScript.Card_Service.CardAction[] },
  {
    children?:
      | GoogleAppsScript.Card_Service.CardAction
      | GoogleAppsScript.Card_Service.CardAction[];
  }
> = (props) => {
  return { actions: getArray(props.children) };
};

/**
 * Groups CardSections of a Card.
 * @param props
 * @returns
 */
export const CardSections: FC<
  { sections: GoogleAppsScript.Card_Service.CardSection[] },
  {
    children?:
      | GoogleAppsScript.Card_Service.CardSection
      | GoogleAppsScript.Card_Service.CardSection[];
  }
> = (props) => {
  return { sections: getArray(props.children) };
};
