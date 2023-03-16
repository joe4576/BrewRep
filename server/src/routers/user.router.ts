import { publicProcedure, router } from "../trpc";
import { User, userValidator } from "../models/user.model";
import { UserService } from "../services/userService";
import { uuidValidator } from "../models/validators/commonValidators";

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
  createUser: publicProcedure
    .input(userValidator)
    .mutation(async ({ input, ctx }) => {
      const userService = new UserService(ctx.prisma);
      const newUser = await userService.createUser(input);

      return newUser;
    }),
});
