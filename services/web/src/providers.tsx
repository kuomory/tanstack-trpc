import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { theme } from "./theme";
import { queryClient } from "./utils/queryClient";
import { trpc, trpcClientOptions } from "./utils/trpc";

export function Providers({ children }: { children: ReactNode }) {
  const [trpcClient] = useState(() => trpc.createClient(trpcClientOptions));
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
