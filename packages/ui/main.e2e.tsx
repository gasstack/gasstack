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
  textField,
  arrayField,
  buildForm,
  dateField,
  datetimeField,
  numberField,
  timeField,
  TextInput,
  Switch,
  DecoratedText,
  DatePicker,
} from "./index";

const router = createActionRouter({
  notifica: (e) => response(notify("Testo da card action")),
  click: (e) => ActionResponse({ notification: notify("Testo da bottone") }),
  gridClick: (e: GoogleAppsScript.Addons.EventObject) => {
    return ActionResponse({
      notification: notify(getClickedItemId(e)),
    });
  },
  submit: (e) => {
    const parsed = testForm.parse(e);

    let validation = testForm.validate(parsed);
    if (validation.success) {
      return response(notify(JSON.stringify(parsed)));
    } else {
      return response(notify(JSON.stringify(validation.errors)));
    }
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

const testFormDesc = {
  name: textField(),
  age: numberField(),
  birthDay: dateField(),
};

const testForm = buildForm(testFormDesc, {
  age: (p) => (p > 30 ? ["Too old"] : undefined),
});

//TODO: implement something for onOpen and for menu generation GoogleAppsScript.Base.Ui
//TODO: write docs in README
//TODO: configure multi target in order to have both @gasstack/ui and @gasstack/ui/jsx-runtime
function test_home() {
  return [
    ...(
      <>
        <Card>
          <CardHeader title="Form" />
          <CardSections>
            <CardSection header="form">
              <TextInput fieldName={testForm.fields.name} title="Name" />
              <TextInput fieldName={testForm.fields.age} title="Age" />
              <DatePicker
                fieldName={testForm.fields.birthDay}
                title="Birthday"
              />
              <TextButton
                text="Submit"
                backgroundColor="#ffff00"
                onClick={router.submit}
              />
            </CardSection>
          </CardSections>
        </Card>
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
              <Grid
                title="Test grid"
                onClick={router.gridClick}
                columnsCount={2}
              >
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
    ),
    ...test_fn(),
  ];
}

function test_contextual() {
  return (
    <Card>
      <CardHeader title="Prova Ctx" subtitle="Sottotitolo" />
      <PeekCardHeader title="Peek Prova" subtitle="Peek Sottotitolo" />

      <CardActions>
        <CardAction text="Notifica" onClick={router.notifica} />
      </CardActions>

      <FixedFooter
        primaryButton={<TextButton text="Click" onClick={router.click} />}
      />
    </Card>
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
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png?20221110153201",
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
