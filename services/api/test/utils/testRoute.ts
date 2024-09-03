import {
  AnyProcedure,
  MaybePromise,
  RouterRecord,
} from "@trpc/server/unstable-core-do-not-import";
import { createCallerFactory, router } from "../../src/trpc";

export function testRoute<T extends RouterRecord | AnyProcedure>(
  route: T,
  ctx: object | (() => MaybePromise<object>) = {}
) {
  const createCaller = createCallerFactory(router({ run: route }));
  const caller = createCaller(ctx);
  return caller;
}
