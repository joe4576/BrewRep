import { protectedProcedure, publicProcedure, router } from "../trpc";
import { uuidValidator } from "../models/validators/commonValidators";
import { TRPCError } from "@trpc/server";
import { TenantService } from "../services/tenantService";
import { Tenant } from "../models/tenant.model";

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
});
