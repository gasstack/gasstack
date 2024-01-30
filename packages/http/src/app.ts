import {
  Application,
  ApplicationBuilder,
  ApplicationBuilderFn,
  HttpRequest,
  HttpResponse,
  MiddlewareFn,
  PathParams,
  RouteHandler,
} from "./types";

type RouteEntries = { [key: string]: RouteHandler };

type PathMatchResult = {
  path: string;
  params: PathParams;
};

type BuilderParams = {
  middlewares: MiddlewareFn[];
  routes: RouteEntries;
};

const httpMethodPrefixes = {
  get: "get://",
  post: "post://",
};

function pathMatch(
  paths: string[],
  requestPath: string,
  prefix: string
): PathMatchResult | null {
  for (let path of paths) {
    if (!path.startsWith(prefix)) continue;

    const reqSegments = requestPath?.split("/") ?? [];
    const pathSegments = path.replace(new RegExp(`^${prefix}`), "").split("/");

    if (reqSegments.length != pathSegments.length) continue;

    const params: Record<string, string> = {};
    let i = 0;
    while (i < reqSegments.length) {
      if (pathSegments[i] != reqSegments[i]) {
        if (!pathSegments[i].startsWith(":")) break;

        params[pathSegments[i].replace(/^:/, "")] = reqSegments[i];
      }
      i++;
    }
    if (i == reqSegments.length)
      return {
        path,
        params,
      };
  }

  return null;
}

function createBuilder({
  middlewares,
  routes,
}: BuilderParams): ApplicationBuilder {
  const app = {
    use: (fn: MiddlewareFn) => {
      if (!!fn) middlewares.push(fn);
      return app;
    },
    get: (match: string, fn: MiddlewareFn | MiddlewareFn[]) => {
      match = match.replace(/^\//, "");
      routes[`${httpMethodPrefixes.get}${match}`] = fn;
      return app;
    },
    post: (match: string, fn: MiddlewareFn | MiddlewareFn[]) => {
      match = match.replace(/^\//, "");
      routes[`${httpMethodPrefixes.post}${match}`] = fn;
      return app;
    },
    all: (match: string, fn: MiddlewareFn | MiddlewareFn[]) => {
      match = match.replace(/^\//, "");
      routes[`${httpMethodPrefixes.get}${match}`] = fn;
      routes[`${httpMethodPrefixes.post}${match}`] = fn;
      return app;
    },
  };

  return app;
}

function createRequestHandelr({
  middlewares,
  routes,
}: BuilderParams): Application {
  return (request: HttpRequest) => {
    const response: HttpResponse = { result: null };
    for (let fn of middlewares) {
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.result) {
        return response.result;
      }

      fn(request, response);
    }

    const methodPrefix =
      request.contentLength >= 0
        ? httpMethodPrefixes.post
        : httpMethodPrefixes.get;
    const match = pathMatch(
      Object.keys(routes),
      request.pathInfo,
      methodPrefix
    );

    if (!match) throw Error(`Resource not found '${request.pathInfo}'`);

    request.pathParams = match.params;

    const routeHandlers = routes[match.path];

    const fn = Array.isArray(routeHandlers) ? routeHandlers : [routeHandlers];
    for (let f of fn) {
      if (response.error) break;

      f(request, response);
    }

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.result) {
      throw new Error(
        `Missing result for handled resource '${request.pathInfo}'`
      );
    }

    return response.result;
  };
}

export type ViewParams = { [key: string]: any };
export type HttpResponseHelper = {
  ok(): void;
  view(path: string, params: ViewParams): void;
  json(content: any): void;
  text(content: string): void;
  download(content: string, filename: string): void;
  error(error: string): void;
};

/**
 * Wraps a response object in an helper to produce the deisred response.
 * @param response Return Helper handler to produce an http response.
 * @returns Http response helper/builder object.
 */
export function respond(response: HttpResponse): HttpResponseHelper {
  return {
    ok: () => {
      response.result = HtmlService.createHtmlOutput();
    },
    view: (path: string, params: ViewParams) => {
      const t = HtmlService.createTemplateFromFile(path);
      t.params = params;
      response.result = t.evaluate();
    },
    json: (content: any) => {
      response.result = ContentService.createTextOutput()
        .setMimeType(ContentService.MimeType.JSON)
        .setContent(JSON.stringify(content));
    },
    text: (content: string) => {
      response.result = ContentService.createTextOutput()
        .setMimeType(ContentService.MimeType.TEXT)
        .setContent(JSON.stringify(content));
    },
    download: (content: string, filename: string) => {
      response.result = ContentService.createTextOutput()
        .setContent(content)
        .downloadAsFile(filename);
    },
    error: (error: string) => {
      response.error = error;
    },
  };
}

/**
 * Factory function to configure an http application in an Express.js-like fashion.
 * @param builder
 * @returns Http Application.
 */
export function appBuilder(builder: ApplicationBuilderFn): Application {
  const middlewares: MiddlewareFn[] = [];
  const routes: RouteEntries = {};

  const app = createBuilder({ middlewares, routes });

  builder(app);

  return createRequestHandelr({ middlewares, routes });
}

export default appBuilder;
