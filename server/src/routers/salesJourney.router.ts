import { TRPCError } from "@trpc/server";
import { router, tenantProcedure } from "../trpc";
import { SalesJourneyService } from "../services/salesJourneyService";
import { uuidValidator } from "../models/validators/commonValidators";
import { salesJourneyValidator } from "../models/salesJourney.model";
import { z } from "zod";

export const salesJourneyRouter = router({
  getAllSalesJourneys: tenantProcedure.query(async ({ ctx }) => {
    const salesJourneyService = new SalesJourneyService(ctx.tenant.id!);

    try {
      return await salesJourneyService.getAllSalesJourneys();
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: e,
        message: "Failed to get all sales journeys",
      });
    }
  }),

  getSalesJourney: tenantProcedure
    .input(uuidValidator)
    .query(async ({ input, ctx }) => {
      const salesJourneyService = new SalesJourneyService(ctx.tenant.id!);

      try {
        return await salesJourneyService.getSalesJourney(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to get sales journey",
        });
      }
    }),

  saveSalesJourney: tenantProcedure
    .input(salesJourneyValidator)
    .mutation(async ({ ctx, input }) => {
      const salesJourneyService = new SalesJourneyService(ctx.tenant.id!);
      try {
        return await salesJourneyService.saveSalesJourney(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to save sales journey",
        });
      }
    }),

  removeVisitFromSalesJourney: tenantProcedure
    .input(
      z.object({
        salesJourneyId: uuidValidator,
        salesVisitId: uuidValidator,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const salesJourneyService = new SalesJourneyService(ctx.tenant.id!);
      const { salesJourneyId, salesVisitId } = input;

      try {
        return await salesJourneyService.removeVisitFromSalesJourney(
          salesVisitId,
          salesJourneyId
        );
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to remove visit from journey",
        });
      }
    }),

  addVisitToSalesJourney: tenantProcedure
    .input(
      z.object({
        salesVisitId: uuidValidator,
        salesJourneyId: uuidValidator,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const salesJourneyService = new SalesJourneyService(ctx.tenant.id!);
      const { salesJourneyId, salesVisitId } = input;

      try {
        return await salesJourneyService.addVisitToSalesJourney(
          salesVisitId,
          salesJourneyId
        );
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to add visit to journey",
        });
      }
    }),

  completeVisit: tenantProcedure
    .input(
      z.object({
        salesVisitId: uuidValidator,
        salesJourneyId: uuidValidator,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const salesJourneyService = new SalesJourneyService(ctx.tenant.id!);
      const { salesJourneyId, salesVisitId } = input;

      try {
        return await salesJourneyService.completeVisit(
          salesVisitId,
          salesJourneyId
        );
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to complete visit",
        });
      }
    }),
});
