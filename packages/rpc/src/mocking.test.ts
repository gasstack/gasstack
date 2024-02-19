import { describe, expect, test } from "vitest";
import { ClientApi, ServerRunMethods } from "./types";
import { MockRunMethods, setupMocks } from "./mocking";
import { RpcClientProxy, createClient, createScopedClient } from "./client";

describe("type inference", () => {
  test("inference check", async () =>
    new Promise<void>(async (done) => {
      const serverApi = {
        sum(a: number, b: number): number {
          return a + b;
        },
        print(s: string): void {},
        wait(range: [number, number]): void {},
      } satisfies ServerRunMethods;

      const serverCoreApi = {
        mul(a: number, b: number): number {
          return a * b;
        },
        display(s: string): void {},
      } satisfies ServerRunMethods;

      const mocks: MockRunMethods<typeof serverApi> = {
        async sum(a: number, b: number): Promise<number> {
          return a + b;
        },
        async print(s: string): Promise<void> {},
        async wait(range: [number, number]): Promise<void> {},
      };
      const mocksCore: MockRunMethods<typeof serverCoreApi> = {
        async mul(a: number, b: number): Promise<number> {
          return a * b;
        },
        async display(s: string): Promise<void> {},
      };

      const mk = setupMocks<typeof serverApi, { ivk: any }>(mocks, {
        ivk: mocksCore,
      });

      const hdl = window.google as ClientApi<RpcClientProxy<typeof serverApi>>;
      hdl.script.run
        .withUserObject({ text: "hello" })
        .withSuccessHandler((res, obj) => {
          expect(res).toBe(3);
          expect(obj).toEqual({ text: "hello" });
          done();
        })
        .sum(1, 2);

      const bridge = createClient<typeof serverApi>();
      expect(await bridge.sum(1, 2)).toEqual([3, undefined]);
      expect(await bridge.ctx_sum({ text: "hello" }, 1, 2)).toEqual([
        3,
        { text: "hello" },
      ]);

      const coreBridge = createScopedClient<typeof serverCoreApi>("ivk");
      expect(await coreBridge.mul(2, 3)).toEqual([6, undefined]);
      expect(await coreBridge.ctx_mul({ text: "hello" }, 2, 3)).toEqual([
        6,
        { text: "hello" },
      ]);
    }));
});
