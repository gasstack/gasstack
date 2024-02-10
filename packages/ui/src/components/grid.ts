import { FC } from "../types";
import { ImageBase64, UrlString, ifDef } from "../utils";

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
export const Grid: FC<GoogleAppsScript.Card_Service.Grid, GridProps> = (
  props
) => {
  const cmp = CardService.newGrid();

  ifDef(props.title, cmp.setTitle);
  ifDef(props.border, cmp.setBorderStyle);
  ifDef(props.columnsCount, cmp.setNumColumns);

  ifDef(props.items, (i) => i.forEach((p) => cmp.addItem(p)));

  return cmp;
};

export type GridItemProps = {
  /** Sets the identifier for the grid item. When a user clicks this grid item, this ID is returned in the parent grid's on_click call back parameters. */
  id: string; //TODO: check for callback arg structuring
  /** Sets the title text of the grid item. */
  title: string;
  /** Sets the subtitle of the grid item. */
  subtitle?: string;
  /** Sets the image for this grid item. */
  image: GoogleAppsScript.Card_Service.ImageComponent;
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
export const GridItem: FC<
  GoogleAppsScript.Card_Service.GridItem,
  GridItemProps
> = (props) => {
  const cmp = CardService.newGridItem();

  cmp.setIdentifier(props.id);
  cmp.setTitle(props.title);
  cmp.setImage(props.image);

  ifDef(props.subtitle, cmp.setSubtitle);
  ifDef(props.layout, cmp.setLayout);
  ifDef(props.textAlignment, cmp.setTextAlignment);

  return cmp;
};

export type ImageComponentProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the border style applied to the image. */
  border?: GoogleAppsScript.Card_Service.BorderStyle;
  /** Sets the crop style for the image. */
  crop?: GoogleAppsScript.Card_Service.ImageCropStyle;
  /** Sets the image to use by providing its URL or data string. */
  url: UrlString | ImageBase64;
};

/**
 * An image component that can be added to grid items.
 * @param props Props to build the ImageComponent.
 * @returns ImageComponent object.
 */
export const ImageComponent: FC<
  GoogleAppsScript.Card_Service.ImageComponent,
  ImageComponentProps
> = (props) => {
  const item = CardService.newImageComponent();

  item.setImageUrl(props.url);

  ifDef(props.altText, item.setAltText);
  ifDef(props.border, item.setBorderStyle);
  ifDef(props.crop, item.setCropStyle);

  return item;
};
