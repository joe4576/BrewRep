import { protectedProcedure, publicProcedure, router } from "../trpc";
import { User } from "../models/user.model";
import { UserService } from "../services/userService";
import { uuidValidator } from "../models/validators/commonValidators";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  getUserById: publicProcedure
    .input(uuidValidator)
    .query(async ({ input, ctx }) => {
      const userService = new UserService(ctx.prisma);
      const user = await userService.getUserById(input);

      return user;
    }),
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const userService = new UserService(ctx.prisma);

    return await userService.getAllUsers();
  }),
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;

    const userService = new UserService(prisma);

    let currentUser: User | null;

    try {
      currentUser = await userService.getCurrentUser(session.user.uid);
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: e,
      });
    }

    return currentUser;
  }),
});
