import { FC } from "../types";
import { ifDef } from "../utils";

export type FixedFooterProps = {
  /**
   * Set the primary button in the fixed footer. The primary button must be a TextButtonStyle.FILLED button. If the background color is unset for the primary button, the button uses the primary color defined in the add-on manifest.
   */
  primaryButton: GoogleAppsScript.Card_Service.TextButton;
  /**
   * Set the secondary button in the fixed footer. The secondary button must be a TextButtonStyle.TEXT button. This method does nothing if setPrimaryButton(button) isn't called to set the primary button.
   */
  secondaryButton?: GoogleAppsScript.Card_Service.TextButton;
};

/**
 * Creates a FixedFooter object.
 * @param props Props to build the FixedFooter.
 * @returns FixedFooter object.
 */
export const FixedFooter: FC<
  GoogleAppsScript.Card_Service.FixedFooter,
  FixedFooterProps
> = (props) => {
  const cmp = CardService.newFixedFooter();

  ifDef(props.primaryButton, cmp.setPrimaryButton);
  ifDef(props.secondaryButton, cmp.setSecondaryButton);

  return cmp;
};
