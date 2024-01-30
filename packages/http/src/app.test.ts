import { describe, expect, test, vi } from "vitest";
import appBuilder from "./app";

describe("Middleware Chain", () => {
  test("All chain with error", () => {
    const calls: any[] = [];
    const mock1 = vi.fn((req, res) => {
      calls.push(1);
    });
    const mock2 = vi.fn((req, res) => {
      calls.push(2);
    });
    const mock3 = vi.fn((req, res) => {
      calls.push(3);
    });

    const app = appBuilder((p) => {
      p.use(mock1).use(mock2).use(mock3);
    });

    const request = {
      pathInfo: "",
      parameter: {},
      parameters: {},
      contextPath: "",
    } as GoogleAppsScript.Events.DoGet;

    expect(() => app(request)).toThrow();

    expect(mock1.mock.calls.length).toBe(1);
    expect(mock2.mock.calls.length).toBe(1);
    expect(mock3.mock.calls.length).toBe(1);

    expect(calls).toEqual([1, 2, 3]);
  });

  test("Chain stop at result", () => {
    const calls: any[] = [];
    const mock1 = vi.fn((req, res) => {
      calls.push(1);
    });
    const mock2 = vi.fn((req, res: any) => {
      calls.push(2);
      res.result = "ok";
    });
    const mock3 = vi.fn((req, res) => {
      calls.push(3);
    });

    const app = appBuilder((p) => {
      p.use(mock1).use(mock2).use(mock3);
    });

    const request = {
      pathInfo: "",
      parameter: {},
      parameters: {},
      contextPath: "",
    } as GoogleAppsScript.Events.DoGet;

    expect(app(request)).toBe("ok");

    expect(mock1.mock.calls.length).toBe(1);
    expect(mock2.mock.calls.length).toBe(1);
    expect(mock3.mock.calls.length).toBe(0);

    expect(calls).toEqual([1, 2]);
  });
});

describe("Matchers", () => {
  test("No match", () => {
    const calls: any[] = [];
    const mock1 = vi.fn((req, res) => {
      calls.push(1);
    });
    const mock2 = vi.fn((req, res: any) => {
      calls.push(2);
    });
    const mock3 = vi.fn((req, res) => {
      calls.push(3);
    });
    const match1 = vi.fn((req, res) => {});

    const app = appBuilder((p) => {
      p.use(mock1).use(mock2).use(mock3).all("/", match1);
    });

    const request = {
      pathInfo: "test",
      parameter: {},
      parameters: {},
      contextPath: "",
    } as GoogleAppsScript.Events.DoGet;

    expect(() => app(request)).toThrow();

    expect(mock1.mock.calls.length).toBe(1);
    expect(mock2.mock.calls.length).toBe(1);
    expect(mock3.mock.calls.length).toBe(1);

    expect(calls).toEqual([1, 2, 3]);
  });

  test("Match with params", () => {
    const calls: any[] = [];
    const mock1 = vi.fn((req, res) => {
      calls.push(1);
    });
    const mock2 = vi.fn((req, res: any) => {
      calls.push(2);
    });
    const mock3 = vi.fn((req, res) => {
      calls.push(3);
    });
    const match1 = vi.fn((req: any, res: any) => {
      expect(req.pathParams.value).toBe("info");
      res.result = "ok";
    });

    const app = appBuilder((p) => {
      p.use(mock1).use(mock2).use(mock3).get("/test/:value", match1);
    });

    const request = {
      pathInfo: "test/info",
      parameter: {},
      parameters: {},
      contextPath: "",
    } as GoogleAppsScript.Events.DoGet;

    expect(app(request)).toBe("ok");

    expect(mock1.mock.calls.length).toBe(1);
    expect(mock2.mock.calls.length).toBe(1);
    expect(mock3.mock.calls.length).toBe(1);

    expect(calls).toEqual([1, 2, 3]);

    expect(match1.mock.calls.length).toBe(1);
  });

  test("Match with get", () => {
    const calls: any[] = [];
    const mock1 = vi.fn((req, res) => {
      calls.push(1);
    });
    const mock2 = vi.fn((req, res: any) => {
      calls.push(2);
    });
    const mock3 = vi.fn((req, res) => {
      calls.push(3);
    });
    const match1 = vi.fn((req: any, res: any) => {
      expect(req.pathParams.value).toBe("info");
      res.result = "ok";
    });

    const app = appBuilder((p) => {
      p.use(mock1).use(mock2).use(mock3).get("/test/:value", match1);
    });

    const request = {
      pathInfo: "test/info",
      parameter: {},
      parameters: {},
      contentLength: -1,
      contextPath: "",
    } as GoogleAppsScript.Events.DoGet;

    expect(app(request)).toBe("ok");

    expect(mock1.mock.calls.length).toBe(1);
    expect(mock2.mock.calls.length).toBe(1);
    expect(mock3.mock.calls.length).toBe(1);

    expect(calls).toEqual([1, 2, 3]);

    expect(match1.mock.calls.length).toBe(1);

    expect(() => app({ ...request, contentLength: 0 })).toThrow();

    expect(mock1.mock.calls.length).toBe(2);
    expect(mock2.mock.calls.length).toBe(2);
    expect(mock3.mock.calls.length).toBe(2);

    expect(calls).toEqual([1, 2, 3, 1, 2, 3]);

    expect(match1.mock.calls.length).toBe(1);
  });
});
