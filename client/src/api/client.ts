import { useUserStore } from "@/store/userStore";
import type { AppRouter } from "@server/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
      headers: () => {
        const userStore = useUserStore();

        return {
          Authorization: userStore.sessionToken ?? "",
          TenantId: userStore.tenantId ?? "",
        };
      },
    }),
  ],
  transformer: superjson,
});
