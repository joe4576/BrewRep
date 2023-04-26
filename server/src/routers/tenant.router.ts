import { TRPCError } from "@trpc/server";
import { tenantValidator } from "../models/tenant.model";
import { uuidValidator } from "../models/validators/commonValidators";
import {
  ProtectedTenantService,
  TenantService,
} from "../services/tenantService";
import { protectedProcedure, router, tenantProcedure } from "../trpc";

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

  getTenant: tenantProcedure.input(uuidValidator).query(async ({ input }) => {
    const tenantService = new TenantService();

    let tenant;

    try {
      tenant = await tenantService.getTenant(input);
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: e,
      });
    }

    return tenant;
  }),

  saveTenant: tenantProcedure
    .input(tenantValidator)
    .mutation(async ({ input, ctx }) => {
      const tenantService = new ProtectedTenantService(ctx.tenant.id!);

      try {
        await tenantService.saveTenant(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
        });
      }
    }),
});
