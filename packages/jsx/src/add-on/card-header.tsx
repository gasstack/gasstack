import { jsxFC } from "../core/types";

export type CardHeaderProps = {
  xy: string;
};

export const CardHeader: jsxFC<CardHeaderProps> = (props) => {
  return (parent: GoogleAppsScript.Card_Service.Card[]) => {
    const builder = CardService.newCardBuilder();

    //TODO: fai
    if (props.xy) builder.setName(props.xy);

    const card = builder.build();
    parent.push(card);

    return card;
  };
};

export default CardHeader;
