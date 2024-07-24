import {
  createTRPCClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import type { AppRouter } from "@app/api/src/routers";
export const trpcClientOptions = {
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      fetch(url, options) {
        return fetch(url, { ...options, credentials: "include" });
      },
      async headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
};
export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = createTRPCClient<AppRouter>(trpcClientOptions);