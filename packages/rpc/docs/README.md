@gasstack/rpc / [Exports](modules.md)

# @gasstack/rpc

The package is meant to simplify the interaction between a contained webpage and the server side of a Google Apps Script application, beeing it a webapp or an addon.

## Description

The package is inspierd by [tRPC]("https://trpc.io/") and provides a way to describe **scoped endpoint**s as functions map on the server side, that can be invoked by a **typed client proxy** on the client side. Moreover, a mocking facility is provided in order to allow local testing of the clien application before the actual deploy to Google Apps Script.

## Usage

On the server side create a scoped endpoint:

```ts
const serverApi = {
  sum(a: number, b: number): number {
    return a + b;
  },
  print(s: string): void {},
  wait(range: [number, number]): void {},
} satisfies ServerRunMethods;

const endpoint = createEndpoint(serverApi);

export serverApiType = typeof serverApi;
```

Then create a function in the global scope to work as a scoping functio. A scoping function is a function whose first parameter is the name of another function which it scopes. Inside it just call the **.invoke** method of the created endpoint:

```ts
function testMyApi(fnName: string, ...params: any[]): any {
  return endpoint.invoke(fnName, ...params);
}
```

On the client side, import the exported _server api type_ and create a typed **client proxy**:

```ts
const client = createScopedClient<serverApiType>("testMyApi");
```

It is even possible to create a global scoped client proxy, if the type given describes a set of global functions:

```ts
const globalClient = createClient<serverApiType>();
```

It is then possible to jsut use the proxies with async/await typed interfaces:

```ts
await client.sum(1, 2);
```

In order to test your client app locally it is possible to setup a mock of your RPC interface:

```ts
setupMocks(
  {
    async sum(a: number, b: number): Promise<number> {
      return a + b;
    },
    async print(s: string): Promise<void> {},
    async wait(range: [number, number]): Promise<void> {},
  },
  {
    testMyApi: {
      async sum(a: number, b: number): Promise<number> {
        return a + b;
      },
      async print(s: string): Promise<void> {},
      async wait(range: [number, number]): Promise<void> {},
    },
  }
);
```

After that you can even use the native Google Apps Script proxy:

```js
window.google.script.run
  .withSuccessHandler((value) => console.log(value))
  .sum(1, 2);
```

## Example

Have a look to the [e2e test](main.e2e.ts).

## API

[API Reference](docs/modules.md)
