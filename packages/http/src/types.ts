export type PathParams = { [key: string]: string };
export type HttpRequest = (
  | GoogleAppsScript.Events.DoGet
  | GoogleAppsScript.Events.DoPost
) & { pathParams?: PathParams };
export type HttpOutput =
  | GoogleAppsScript.HTML.HtmlOutput
  | GoogleAppsScript.Content.TextOutput;
export type HttpResponse = {
  result: HttpOutput | null;
  error?: string | null;
};

export type MiddlewareFn = (
  request: HttpRequest,
  response: HttpResponse
) => void;
export type RouteHandler = MiddlewareFn | MiddlewareFn[];

export type ApplicationBuilder = {
  use(fn: MiddlewareFn): ApplicationBuilder;
  get(match: string, fn: RouteHandler): ApplicationBuilder;
  post(match: string, fn: RouteHandler): ApplicationBuilder;
  all(match: string, fn: RouteHandler): ApplicationBuilder;
};

export type Application = (request: HttpRequest) => HttpOutput;

export type ApplicationBuilderFn = (builder: ApplicationBuilder) => void;
