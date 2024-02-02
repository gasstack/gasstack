import { jsxFC, useComplete } from "../core/types";
import Section from "./section";

export type CardChild = typeof Section;

export type CardProps = {
  name: string;
  dStyle?: GoogleAppsScript.Card_Service.DisplayStyle;
};

export const Card: jsxFC<CardProps, CardChild> = (props) => {
  return (parent: GoogleAppsScript.Card_Service.Card[]) => {
    const builder = CardService.newCardBuilder();

    if (props.name) builder.setName(props.name);
    if (props.dStyle) builder.setDisplayStyle(props.dStyle);

    useComplete(() => {
      const card = builder.build();
      parent.push(card);
    });

    return builder;
  };
};

export default Card;
