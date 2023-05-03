import { SalesVisitService } from "../services/salesVisitService";
import { router, tenantProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { uuidValidator } from "../models/validators/commonValidators";
import { salesVisitValidator } from "../models/salesVisit.model";

export const salesVisitRouter = router({
  getAllSalesVisits: tenantProcedure.query(async ({ ctx }) => {
    const salesVisitService = new SalesVisitService(ctx.tenant.id!);

    try {
      return await salesVisitService.getAllSalesVisits();
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: e,
        message: "Failed to get all sales visits",
      });
    }
  }),

  getSalesVisit: tenantProcedure
    .input(uuidValidator)
    .query(async ({ input, ctx }) => {
      const salesVisitService = new SalesVisitService(ctx.tenant.id!);

      try {
        return await salesVisitService.getSalesVisit(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to get sales visit",
        });
      }
    }),

  saveSalesVisit: tenantProcedure
    .input(salesVisitValidator)
    .mutation(async ({ ctx, input }) => {
      const salesVisitService = new SalesVisitService(ctx.tenant.id!);
      try {
        return await salesVisitService.saveSalesVisit(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to save sales visit",
        });
      }
    }),

  createSalesVisit: tenantProcedure
    .input(salesVisitValidator)
    .mutation(async ({ input, ctx }) => {
      const salesVisitService = new SalesVisitService(ctx.tenant.id!);

      try {
        return await salesVisitService.createSalesVisit({
          ...input,
          tenantId: ctx.tenant.id!,
        });
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to create sales visit",
        });
      }
    }),

  deleteSalesVisit: tenantProcedure
    .input(salesVisitValidator)
    .mutation(async ({ input, ctx }) => {
      const salesVisitService = new SalesVisitService(ctx.tenant.id!);

      try {
        return await salesVisitService.deleteSalesVisit({
          ...input,
          tenantId: ctx.tenant.id!,
        });
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to delete sales visit",
        });
      }
    }),
});
