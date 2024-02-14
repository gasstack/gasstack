import {
  Card,
  CardSection,
  CardHeader,
  CardAction,
  createActionRouter,
  notify,
  TextButton,
  ActionResponse,
  Action,
  Grid,
  GridItem,
  ImageComponent,
  getClickedItemId,
  UniversalActionResponse,
  openLink,
  UrlString,
  PeekCardHeader,
  FixedFooter,
  CardActions,
  CardSections,
  TextParagraph,
  response,
  GridTile,
  GridTileTitle,
} from "./index";

const router = createActionRouter({
  notifica: (e) => response(notify("Testo da card action")),
  click: (e) => ActionResponse({ notification: notify("Testo da bottone") }),
  gridClick: (e: GoogleAppsScript.Addons.EventObject) => {
    return ActionResponse({
      notification: notify(getClickedItemId(e)),
    });
  },
});

((g) => {
  g.universalDyn = (e: any) => {
    console.log(e);

    return UniversalActionResponse({
      action: openLink("https://www.google.com"),
    });
  };
})(Function("return this")() as typeof globalThis);

function TestCard(props: { title: string; children?: any }) {
  return (
    <Card>
      <CardHeader title={props.title} subtitle="Sottotitolo" />
      <CardSections>
        <CardSection header="Primo">{props.children}</CardSection>
      </CardSections>
      <FixedFooter
        primaryButton={<TextButton text="Click" onClick={router.click} />}
      />
    </Card>
  );
}

//TODO: implement JSX
function test() {
  return (
    <>
      <TestCard title="Uno">
        <TextButton text="Click 1" onClick={router.click} />
        <TextButton text="Click 2" onClick={router.click} />
      </TestCard>
      <TestCard title="Due">
        <TextParagraph>{`Prova <b>ecc</b> ecc<br>
        ecc`}</TextParagraph>
      </TestCard>
      <TestCard title="Tre">
        <TextParagraph text="Prova 333 ecc ecc" />
      </TestCard>
      <Card>
        <CardHeader title="Prova Grid" subtitle="Sottotitolo" />
        <PeekCardHeader title="Peek Prova" subtitle="Peek Sottotitolo" />

        <CardActions>
          <CardAction text="Notifica" onClick={router.notifica} />
        </CardActions>

        <CardSections>
          <CardSection header="Primo">
            <Grid title="Test grid" onClick={router.gridClick} columnsCount={2}>
              {new Array(10).fill(0).map((_, i) => (
                <GridTile id={`item-${i}`}>
                  {/* <GridTileTitle title={`title item-${i}`} /> */}
                  <ImageComponent url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png?20221110153201" />

                  <GridTileTitle title={`title item-${i}`} />
                </GridTile>
              ))}
            </Grid>
          </CardSection>
        </CardSections>
        <FixedFooter
          primaryButton={<TextButton text="Click" onClick={router.click} />}
        />
      </Card>
    </>
  );
}

function test_fn() {
  return [
    Card({
      header: CardHeader({ title: "Prova", subtitle: "Sottotitolo" }),
      actions: [
        CardAction({
          text: "Notifica",
          onClick: Action({
            loadIndicator: "spinner",
            builder: router.notifica,
          }),
        }),
      ],
      sections: [
        CardSection({
          header: "Grid",
          widgets: [
            Grid({
              title: "Test Grid",
              onClick: Action({ builder: router.gridClick }),
              columnsCount: 2,
              items: new Array(10).fill(0).map((_, i) =>
                GridItem({
                  id: `item-${i}`,
                  title: `title item-${i}`,
                  image: ImageComponent({
                    url: "data:image/jpeg;base64,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",
                  }),
                })
              ),
            }),
          ],
        }),
        CardSection({
          header: "Primo",
          widgets: [
            TextButton({
              text: "Click",
              onClick: Action({ builder: router.click }),
            }),
          ],
        }),
      ],
    }),
  ];
}
