import { TRPCError } from "@trpc/server";
import { uuidValidator } from "../models/validators/commonValidators";
import { router, tenantProcedure } from "../trpc";
import { CommunicationLogService } from "../services/communicationLogService";
import { communicationLogValidator } from "../models/communicationLog.model";

export const communicationLogsRouter = router({
  getCommunicationLogsForOutlet: tenantProcedure
    .input(uuidValidator)
    .query(async ({ input, ctx }) => {
      const communicationLogService = new CommunicationLogService(
        ctx.tenant.id!
      );

      try {
        return await communicationLogService.getCommunicationLogsForOutlet(
          input
        );
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to get communication logs for outlet",
        });
      }
    }),

  createCommunicationLog: tenantProcedure
    .input(communicationLogValidator)
    .mutation(async ({ input, ctx }) => {
      const communicationLogService = new CommunicationLogService(
        ctx.tenant.id!
      );

      try {
        return await communicationLogService.createCommunicationLog(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to create communication log",
        });
      }
    }),
});
