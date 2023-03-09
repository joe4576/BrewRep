import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  getAllUsers: publicProcedure
    .input(
      z.object({
        valid: z.boolean(),
      })
    )
    .query(({ ctx, input }) => {
      console.log(ctx.session);

      const { valid } = input;

      return {
        valid,
      };
    }),
});
