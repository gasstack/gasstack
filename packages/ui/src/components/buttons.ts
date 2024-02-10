import { FC } from "../types";

/**
 * Holds a set of Button objects that are displayed in a row.
 * @param buttons Set of Buttons.
 * @returns ButtonSet object.
 */
export const ButtonSet: FC<
  GoogleAppsScript.Card_Service.ButtonSet,
  GoogleAppsScript.Card_Service.Button[]
> = (buttons) => {
  const set = CardService.newButtonSet();

  buttons.forEach((btn) => set.addButton(btn));

  return set;
};
