# @gasstack/http

The package is http api microframework, inspired by [Express.js](https://expressjs.com/), meant to allow the implementation of REST APIs with Google Apps Script.

## Description

The package allows create an http API.

## Usage

The library expose an **appBuilder** function which allows you to create and configure an http response handler for the special function events **doGet** and **doPost** of the Google Apps Script environment.

You can create and configure an **app function** and use it to handle both special events.

```ts
const app = appBuilder((builder) => {
  builder
    .use((req, res) => {
      console.log(req.contextPath);
    })
    .get("/api/:name", (req, res) => {
      respond(res).text(`Hello ${req.pathParams!.name}`);
    })
    .all("/view/:name", (req, res) => {
      respond(res).view("index.e2e", { name: req.pathParams!.name });
    });
});

function doGet(e: GoogleAppsScript.Events.DoGet) {
  return app(e);
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  return app(e);
}
```

It is possible to insert special segments in the mapping url pattern in the form of **:_name_** which will be matched against the real request setting the keys of the _params_ member of the request object.

To build the response an helper is available wich allows and simplifies the production of text, downloadable content, json and templated html views.

```ts
type HttpResponseHelper = {
  ok(): void;
  view(path: string, params: ViewParams): void;
  json(content: any): void;
  text(content: string): void;
  download(content: string, filename: string): void;
  error(error: string): void;
};
```

## Example

Have a look to the [e2e test](main.e2e.ts).

## API

[API Reference](docs/modules.md)
