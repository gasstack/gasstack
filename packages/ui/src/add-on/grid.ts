import { uiFC } from "../core";

export type GridProps = {
  /** Sets the title text of the grid. The text must be a plain string with no formatting. */
  title: string;
  /** GridItems of the grid. */
  items: GoogleAppsScript.Card_Service.GridItem[];
  /** Sets the border style applied to each grid item. Default is NO_BORDER. */
  border?: GoogleAppsScript.Card_Service.BorderStyle;
  /** The number of columns to display in the grid. If shown in the right side panel, you can display 1-2 columns and the default value is 1. If shown in a dialog, you can display 2-3 columns and the default value is 2. */
  columnsCount?: number;
};

/**
 * An organized grid to display a collection of grid items.
 * @param props Props to build the Grid.
 * @returns Grid object.
 */
export const Grid: uiFC<GoogleAppsScript.Card_Service.Grid, GridProps> = (
  props
) => {
  const item = CardService.newGrid();

  item.setTitle(props.title);

  props.items.forEach((p) => item.addItem(p));

  if (props.border) item.setBorderStyle(props.border);
  if (props.columnsCount) item.setNumColumns(props.columnsCount);

  return item;
};

export type GridItemProps = {
  /** Sets the identifier for the grid item. When a user clicks this grid item, this ID is returned in the parent grid's on_click call back parameters. */
  id: string;
  /** Sets the title text of the grid item. */
  title: string;
  /** Sets the subtitle of the grid item. */
  subtitle?: string;
  /** Sets the image for this grid item. */
  image?: GoogleAppsScript.Card_Service.ImageComponent;
  /** Sets the layout of text and image for the grid item. Default is TEXT_BELOW */
  layout?: GoogleAppsScript.Card_Service.GridItemLayout;
  /** Sets the horizontal alignment of the grid item. Default is START. */
  textAlignment?: GoogleAppsScript.Card_Service.HorizontalAlignment;
};

/**
 * The items users interact with within a grid widget.
 * @param props Props to build the GridItem.
 * @returns GridItem object.
 */
export const GridItem: uiFC<
  GoogleAppsScript.Card_Service.GridItem,
  GridItemProps
> = (props) => {
  const item = CardService.newGridItem();

  item.setIdentifier(props.id);
  item.setTitle(props.title);

  if (props.subtitle) item.setSubtitle(props.subtitle);
  if (props.image) item.setImage(props.image);
  if (props.layout) item.setLayout(props.layout);
  if (props.textAlignment) item.setTextAlignment(props.textAlignment);

  return item;
};
