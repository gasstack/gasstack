import { uiFC } from "../core";

export type SectionProps = {
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
export const CardSection: uiFC<
  GoogleAppsScript.Card_Service.CardSection,
  SectionProps
> = (props) => {
  const section = CardService.newCardSection();

  if (props.collabsible !== undefined)
    section.setCollapsible(props.collabsible);
  if (props.header) section.setHeader(props.header);
  if (props.collapsibleCount)
    section.setNumUncollapsibleWidgets(props.collapsibleCount);

  if (props.widgets) props.widgets.forEach((p) => section.addWidget(p));

  return section;
};
