import { TRPCError } from "@trpc/server";
import { Outlet, outletValidator } from "../models/outlet.model";
import {
  uuidArrayValidator,
  uuidValidator,
} from "../models/validators/commonValidators";
import { OutletService } from "../services/outletService";
import { router, tenantProcedure } from "../trpc";

export const outletRouter = router({
  createOutlet: tenantProcedure
    .input(outletValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const outletService = new OutletService(tenant.id!);

      try {
        return await outletService.createOutlet(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to create outlet",
        });
      }
    }),

  getOutlet: tenantProcedure
    .input(uuidValidator)
    .query(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const outletService = new OutletService(tenant.id!);

      try {
        return await outletService.getOutlet(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to get outlet",
        });
      }
    }),

  getAllOutlets: tenantProcedure.query(async ({ ctx }) => {
    const { tenant } = ctx;

    const outletService = new OutletService(tenant.id!);

    let outlets: Outlet[] = [];

    try {
      outlets = await outletService.getAllOutlets();
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: e,
        message: "Failed to get all outlets",
      });
    }

    return outlets;
  }),

  getOutlets: tenantProcedure
    .input(uuidArrayValidator)
    .query(async ({ ctx, input }) => {
      const { tenant } = ctx;

      const outletService = new OutletService(tenant.id!);

      let outlets: Outlet[] = [];

      try {
        outlets = await outletService.getOutlets(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to get outlets",
        });
      }

      return outlets;
    }),

  saveOutlet: tenantProcedure
    .input(outletValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;

      const outletService = new OutletService(tenant.id!);

      try {
        return await outletService.saveOutlet(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to save outlet",
        });
      }
    }),

  deleteOutlet: tenantProcedure
    .input(outletValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;

      const outletService = new OutletService(tenant.id!);

      try {
        await outletService.deleteOutlet(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to delete outlet",
        });
      }
    }),
});
