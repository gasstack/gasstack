@gasstack/ui / [Exports](modules.md)

# @gasstack/kv

The package is meant to highly improve the DX of building a Workspace addOn with Google App Script. In particular it allows a developer to:

- Use JSX syntax.
- Use anonymous function as callbacks for *Actions*and *MenuItem*s.
- Manage Forms and form validation.

## Description

The library is a wrapper around the google api for addons. It aims to simplify and modernize the DX of the people using [Typescript](https://www.typescriptlang.org/) and [clasp](https://www.npmjs.com/package/@google/clasp).

## Usage

In order to use JSX syntax it is necessary to modify the **tsconfig.json** file adding the following keys:

```json
{
  "jsx": "react-jsx",
  "jsxImportSource": "@gasstack/ui"
}
```

Example:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable", "ESNext.Disposable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "jsx": "react-jsx",
    "jsxImportSource": "./",

    "moduleResolution": "bundler"
  }
}
```

After that it is possibile to create an addon UI, hompage function like that:

```tsx
function home() {
  return (
    <>
      <Card>
        <CardHeader title="Form" />
        <CardSections>
          <CardSection header="form">
            <TextInput fieldName={testForm.fields.name} title="Name" />
            <TextInput fieldName={testForm.fields.age} title="Age" />
            <DatePicker fieldName={testForm.fields.birthDay} title="Birthday" />
            <TextButton
              text="Submit"
              backgroundColor="#ffff00"
              onClick={router.submit}
            />
          </CardSection>
        </CardSections>
      </Card>

      <Card>
        <CardHeader title="Test Grid" subtitle="Subtitle" />
        <PeekCardHeader title="Peek Test" subtitle="Peek Subtitle" />

        <CardActions>
          <CardAction text="Notification" onClick={router.notify} />
        </CardActions>

        <CardSections>
          <CardSection header="First">
            <Grid title="Test grid" onClick={router.gridClick} columnsCount={2}>
              {new Array(10).fill(0).map((_, i) => (
                <GridTile id={`item-${i}`}>
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
```

In order to use functions both anonymous and named without the hastle of ensuring they are available in the global scope and not clashing with other symbols, it is possible to use the **ActionRouter** and the **FunctionRouter**.

```ts
const router = createActionRouter({
  notifica: (e) => response(notify("Notification")),
  click: (e) =>
    ActionResponse({ notification: notify("Another notification") }),
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

const fnRouter = createFunctionRouter({
  test_fn: () => console.log("hello"),
});
```

## Example

Have a look to the [e2e test](main.e2e.ts).

## API

[API Reference](docs/modules.md)
