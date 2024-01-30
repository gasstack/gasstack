@gasstack/kv / [Exports](modules.md)

# @gasstack/kv

The package is meant to allow the creation and usage of key-value store in Google App Script applications.

## Description

The package allows create basic managed (handling serialization and deserialization) KV store using _Properties_, _Spreadsheets_, _Documents_, etc.

## Usage

It is possible to create a KV store from a property store:

```ts
const kv = createPropertiesStore(PropertiesService.getDocumentProperties());

kv.set("obj", { name: "test", value: 10 });

console.log(kv.get("obj").value);
```

## Example

Have a look to the [e2e test](main.e2e.ts).

## API

[API Reference](docs/modules.md)
