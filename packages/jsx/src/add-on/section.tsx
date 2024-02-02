import { jsxFC } from "../core/types";

export type SectionProps = {
  name: string;
};

export const Section: jsxFC<SectionProps> = (props) => {
  return (parent: GoogleAppsScript.Card_Service.CardBuilder) => {
    const builder = CardService.newCardBuilder();
    //TODO: fai
    return parent;
  };
};

export default Section;
