@gasstack/fs / [Exports](modules.md)

# @gasstack/fs

The package is meant to ease the useage of the Google App Script _DriveApp_ functionalities.

## Description

The package allows to explore folders and files using arrays and operators instead of iterators and verbose callback-based method calls.

## Usage

It is possible to implement filtering with array functions

```ts
const recentFilesSize = getFiles("<folder id>")
  .filter((p) => p.getLastUpdated() < 7 * 24 * 60 * 60 * 1000)
  .reduce((acc, p) => acc + p.getSize());
```

It is also possible to use an base iterator to implement cursor based pagination:

```ts
const filesIterator = DriveApp.getFolderById("<folder id>").getFiles();

let page = fromDriveIterator(filesIterator, 10);

page = continueFiles(filesIterator.getContinuationToken(), 10);
```

## Example

Have a look to the [e2e test](main.e2e.ts).

## API

[API Reference](docs/modules.md)
