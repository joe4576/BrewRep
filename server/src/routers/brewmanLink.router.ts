import { TRPCError } from "@trpc/server";
import { router, tenantProcedure } from "../trpc";
import { BrewmanLinkService } from "../services/brewmanLinkService";
import { brewmanLinkValidator } from "../models/brewmanLink.model";

export const brewmanLinkRouter = router({
  getBrewmanLink: tenantProcedure.query(async ({ ctx }) => {
    const brewmanLinkService = new BrewmanLinkService(ctx.tenant.id!);

    try {
      return await brewmanLinkService.getBrewmanLink();
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: e,
        message: "Failed to get brewman link",
      });
    }
  }),

  createBrewmanLink: tenantProcedure
    .input(brewmanLinkValidator)
    .mutation(async ({ input, ctx }) => {
      const brewmanLinkService = new BrewmanLinkService(ctx.tenant.id!);

      try {
        return await brewmanLinkService.createBrewmanLink(input);
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: e,
          message: "Failed to create brewman link",
        });
      }
    }),

  disconnectBrewmanLink: tenantProcedure.mutation(async ({ ctx }) => {
    const brewmanLinkService = new BrewmanLinkService(ctx.tenant.id!);

    try {
      return await brewmanLinkService.disconnectBrewmanLink();
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: e,
        message: "Failed to create brewman link",
      });
    }
  }),
});
