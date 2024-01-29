# @gasstack/db

The package is meant to enable the useage of a Google Sheet as a database-like store.

## Description

The package allows to define schemas in a way similar to [Drizzle](https://orm.drizzle.team/) and use them to create typed *ContextRef*s. The *ContextRef*s can be used with a typed basic CRUD API and as enablers of a more advanced ORM-like API.
Through the basic *ContextRef*s is possible to read, insert, delete and update entities of a given sheet range, both singularly and by group of contiguous rows.

Using a _ManagedContexRef_ is possible to opearate in memory, adding, removing or updating directly in place entity objects both with the possibility to _rollback_ the operations or _commit_ them.

## Usage

The schema definition allows you to create a map-like object, specifing for each key both the data type and the position
of the corresponding column in the sheet range.
It is also possibile to _decorate_ a field with modifiers hinting _autogeration_ or _readonlyness_.

```ts
const mapping = {
  id: numeric("Num"),
  name: text(1),
  seq: serial(numeric(2)),
  fseq: formula(numeric(3)),
  score: boolean("Rank"),
  link: hyperLink("Link"),
};
```

The schema defined is than used to obtain *ContextRef*s:

```ts
const ctx = createContext<typeof mapping>(
  ss,
  { a1NotationRange: "ranges!O5:T5" },
  mapping
);
```

And use them with the CRUD or the ORM API:

```ts
let item = insertAt(
  ctx,
  {
    id: 5,
    name: "five",
    score: true,
    link: { url: "https://www.google.com", label: "Page 5" },
  },
  1
);

console.log(read(ctx));

const orm = createManagedContext(ctx);

item = orm.list()[0];

item.name = "test";

commit(orm);
```

## Example

Have a look to the [e2e test](main.e2e.ts).

## API

[API Reference](docs/modules.md)
