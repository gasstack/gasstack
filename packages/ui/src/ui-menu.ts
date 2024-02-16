import { RoutedFunctionKey } from "./functions-router";
import { FC } from "./types";
import { getArray } from "./utils";

export type MenuItemProps = {
  caption: string;
  functionName: RoutedFunctionKey<any, any>;
};
export type MenuItemType = { caption: string; functionName: string };

export const MenuItem: FC<MenuItemType, MenuItemProps> = (props) => {
  return { caption: props.caption, functionName: props.functionName };
};

export type MenuSeparatorType = { __type__: "menu-item-separator" };

export const MenuSeparator: FC<MenuSeparatorType, {}> = () => ({
  __type__: "menu-item-separator",
});

export type MenuBuilder = (
  ui: GoogleAppsScript.Base.Ui
) => GoogleAppsScript.Base.Menu;

export type MenuChildrenType = MenuBuilder | MenuItemType | MenuSeparatorType;

export type MenuProps = {
  caption: string;

  children?: MenuChildrenType | MenuChildrenType[];
};

function configureMenu(
  ui: GoogleAppsScript.Base.Ui,
  menu: GoogleAppsScript.Base.Menu,
  children: MenuChildrenType[]
) {
  children.forEach((item) => {
    if (typeof item === "function") {
      menu.addSubMenu(item(ui));
    } else if ("__type__" in item && item.__type__ === "menu-item-separator") {
      menu.addSeparator();
    } else if ("caption" in item) {
      menu.addItem(item.caption, item.functionName);
    }
  });
}

export const Menu: FC<MenuBuilder, MenuProps> = (props) => {
  return (ui) => {
    const menu = ui.createMenu(props.caption);

    configureMenu(ui, menu, getArray(props.children));

    return menu;
  };
};

export function buildMenu(
  ui: GoogleAppsScript.Base.Ui,
  builder: MenuBuilder
): GoogleAppsScript.Base.Menu;
export function buildMenu(
  ui: GoogleAppsScript.Base.Ui,
  builder: MenuChildrenType[],
  menu: GoogleAppsScript.Base.Menu
): GoogleAppsScript.Base.Menu;
export function buildMenu(
  ui: GoogleAppsScript.Base.Ui,
  builder: MenuBuilder | MenuChildrenType[],
  menu?: GoogleAppsScript.Base.Menu
): GoogleAppsScript.Base.Menu {
  if (Array.isArray(builder)) {
    configureMenu(ui, menu, builder);
    return menu;
  } else return builder(ui);
}
