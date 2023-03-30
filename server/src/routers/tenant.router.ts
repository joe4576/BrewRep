import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { TenantSerice } from "../services/tenantService";

export const tenantRouter = router({
  getAllTenantsAndTenantGroups: protectedProcedure.query(async ({ ctx }) => {
    const tenantSerivce = new TenantSerice(ctx.prisma);

    try {
      return await tenantSerivce.getAllTenantsAndTenantGroups();
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: e,
      });
    }
  }),
});
