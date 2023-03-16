import { publicProcedure, router } from "../trpc";
import { User, userValidator } from "../models/user.model";

export const userRouter = router({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const allUsers: User[] = await ctx.prisma.user.findMany();
    return allUsers;
  }),
  createUser: publicProcedure
    .input(userValidator)
    .mutation(async ({ input, ctx }) => {
      const newUser: User = await ctx.prisma.user.create({
        data: {
          name: input.name,
        },
      });

      return newUser;
    }),
});
