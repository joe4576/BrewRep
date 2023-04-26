import { TRPCError } from "@trpc/server";
import { uuidValidator } from "../models/validators/commonValidators";
import { TenantService } from "../services/tenantService";
import { protectedProcedure, router } from "../trpc";
import { tenantValidator } from "../models/tenant.model";

export const tenantRouter = router({
  getAllTenants: protectedProcedure
    .input(uuidValidator)
    .query(async ({ ctx, input }) => {
      const tenantService = new TenantService();

      let tenants = [];

      try {
        tenants = await tenantService.getAllTenants(input);
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: e,
        });
      }

      return tenants;
    }),

  createTenant: protectedProcedure
    .input(tenantValidator)
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx;
      const tenantService = new TenantService();

      try {
        await tenantService.createTenant(input, session.user.id!);
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: e,
        });
      }

      return input.id!;
    }),
});
