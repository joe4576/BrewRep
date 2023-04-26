import { TRPCError } from "@trpc/server";
import { userValidator } from "../models/user.model";
import { UserService } from "../services/userService";
import { protectedProcedure, router, tenantProcedure } from "../trpc";
import { uuidValidator } from "../models/validators/commonValidators";

export const userRouter = router({
  getAllUsers: tenantProcedure.query(async ({ ctx }) => {
    const { tenant } = ctx;
    const userService = new UserService(tenant.id!);

    return await userService.getAllUsers();
  }),

  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;
    return session.user;
  }),

  saveUser: tenantProcedure
    .input(userValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const userService = new UserService(tenant.id!);

      try {
        await userService.saveUser(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to save user",
        });
      }
    }),

  removeUserFromCurrentTenant: tenantProcedure
    .input(uuidValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const userService = new UserService(tenant.id!);

      try {
        await userService.removeUserFromCurrentTenant(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "Failed to remove user from tenant",
        });
      }
    }),

  addUserToCurrentTenant: tenantProcedure
    .input(uuidValidator)
    .mutation(async ({ input, ctx }) => {
      const { tenant } = ctx;
      const userService = new UserService(tenant.id!);

      try {
        return await userService.addUserToCurrentTenant(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: e,
          message: "User not added to the tenant",
        });
      }
    }),
});
