import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const {
  router,
  procedure: publicProcedure,
  createCallerFactory,
} = initTRPC.create({
  transformer: superjson,
});

export { router, publicProcedure, createCallerFactory };
